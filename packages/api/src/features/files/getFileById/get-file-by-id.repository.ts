import { injectable, inject } from "tsyringe";
import { IGetFileByIdRepository } from "../files.repository.interface";
import { Knex } from "knex";
import { Client } from "minio";
import { FileNotFoundError } from "../../../../../core/file/file.error";
import { TFileResponse } from "../../../../../core/file/file";

@injectable()
export class GetFileByIdRepository implements IGetFileByIdRepository {
  constructor(
    @inject("FileStorage") private readonly _fileStorage: Client,
    @inject("Database") private readonly _db: Knex,
  ) {}
  async get(credentials: { fileId: string; userId: string }): Promise<any> {
    const [file] = await this._db<Omit<TFileResponse, "size" | "lastUpdate">>(
      "file",
    ).where({
      id: credentials.fileId,
      user_id: credentials.userId,
    });

    if (!file) {
      throw new FileNotFoundError();
    }

    const [bucketName, _] = file.path.split("/");
    const fileMetadata = await this._fileStorage.statObject(
      bucketName,
      file.name,
    );

    return {
      ...file,
      size: fileMetadata.size,
      lastUpdate: fileMetadata.lastModified,
    };
  }
}
