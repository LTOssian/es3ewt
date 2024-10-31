import { inject, injectable } from "tsyringe";
import { IStoreFileRepository } from "../files.repository.interface";
import { Client } from "minio";

@injectable()
export class StoreInBucketRepository implements IStoreFileRepository {
  constructor(@inject("FileStorage") private readonly _fileStorage: Client) {}
  async store(credentials: {
    userId: string;
    file: Express.Multer.File;
  }): Promise<void> {
    const bucketPath = `${credentials.userId}-files`;
    const exists = await this._fileStorage.bucketExists(bucketPath);
    if (!exists) await this._fileStorage.makeBucket(bucketPath, "eu-west-1");

    const info = await this._fileStorage.putObject(
      bucketPath,
      credentials.file.filename,
      credentials.file.buffer,
      credentials.file.size,
      { "Content-Type": credentials.file.mimetype },
    );
  }
}
