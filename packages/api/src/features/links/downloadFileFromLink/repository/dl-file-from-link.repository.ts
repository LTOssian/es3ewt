import { inject, injectable } from "tsyringe";
import { IDownloadFileFromLinkRepository } from "./dl-file-from-link.interface.repository";
import { Knex } from "knex";
import { Client } from "minio";
import { TFileResponse } from "../../../../../../core/file/file";
import { FileNotFoundError } from "../../../../../../core/file/file.error";
import { Response } from "express";
import { LinkNotFoundError } from "../../../../../../core/link/link.error";

@injectable()
export class DownloadFileFromLinkRepository
  implements IDownloadFileFromLinkRepository
{
  constructor(
    @inject("FileStorage") private readonly _fileStorage: Client,
    @inject("Database") private readonly _db: Knex,
  ) {}
  async getInformations(credentials: { linkId: string }): Promise<any> {
    const { linkId } = credentials;

    const result = await this._db("link")
      .join("file", "link.file_id", "=", "file.id")
      .join("user", "file.user_id", "=", "user.id")
      .select(
        "user.username as shareBy",
        "file.name as name",
        "file.size as size",
      )
      .where("link.id", linkId)
      .first();

    if (!result) {
      throw new LinkNotFoundError();
    }

    return result;
  }

  async download(credentials: {
    linkId: string;
    response: Response;
  }): Promise<void> {
    const { linkId, response } = credentials;
    const file = await this._db<Omit<TFileResponse, "lastUpdate">>("link")
      .join("file", "file.id", "link.file_id")
      .where("link.id", linkId)
      .select("file.*")
      .first();

    if (!file) throw new FileNotFoundError();
    const [bucket, original_filename] = file.path.split("/");
    const { metaData } = await this._fileStorage.statObject(
      bucket,
      original_filename,
    );
    const fileStream = await this._fileStorage.getObject(
      bucket,
      original_filename,
      {},
    );

    response.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.name}"`,
    );
    response.setHeader("Content-Type", metaData["content-type"]);

    fileStream.pipe(response);
    fileStream.on("end", () => {
      console.log(`File download complete`);
    });
    fileStream.on("error", (error) => {
      console.error("Error streaming file from MinIO:", error);
      throw error;
    });
  }
}
