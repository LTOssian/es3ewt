import { inject, injectable } from "tsyringe";
import { IDownloadFileFromLinkRepository } from "./dl-file-from-link.interface.repository";
import { Knex } from "knex";
import { Client } from "minio";
import { TFileResponse } from "../../../../../../core/file/file";
import { FileNotFoundError } from "../../../../../../core/file/file.error";
import { Response } from "express";

@injectable()
export class DownloadFileFromLinkRepository
  implements IDownloadFileFromLinkRepository
{
  constructor(
    @inject("FileStorage") private readonly _fileStorage: Client,
    @inject("Database") private readonly _db: Knex,
  ) {}

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
    const [bucket, _] = file.path.split("/");
    const fileStream = this._fileStorage.getObject(bucket, file.name, {});

    // Set headers for file download (optional)
    response.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.name}"`,
    );
    response.setHeader("Content-Type", "application/zip");

    (await fileStream).pipe(response);
    (await fileStream).on("end", () => {
      console.log(`File download complete`);
    });
    (await fileStream).on("error", (error) => {
      console.error("Error streaming file from MinIO:", error);
      throw error;
    });
  }
}
