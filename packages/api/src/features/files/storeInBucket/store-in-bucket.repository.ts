import { inject, injectable } from "tsyringe";
import { IStoreFileRepository } from "../files.repository.interface";
import { Client } from "minio";
import { Knex } from "knex";

@injectable()
export class StoreInBucketRepository implements IStoreFileRepository {
  constructor(
    @inject("FileStorage") private readonly _fileStorage: Client,
    @inject("Database") private readonly _db: Knex,
  ) {}
  async store(credentials: {
    userId: string;
    file: Express.Multer.File;
  }): Promise<void> {
    const bucketPath = `${credentials.userId}-files`;
    const exists = await this._fileStorage.bucketExists(bucketPath);
    if (!exists) await this._fileStorage.makeBucket(bucketPath, "eu-west-1");

    await this._fileStorage.putObject(
      bucketPath,
      credentials.file.filename,
      credentials.file.buffer,
      credentials.file.size,
      { "Content-Type": credentials.file.mimetype },
    );
    await this._db("file").insert({
      user_id: credentials.userId,
      name: credentials.file.filename,
      path: `${bucketPath}/${credentials.file.filename}`,
    });
  }
}
