import { container, Lifecycle } from "tsyringe";
import {
  IGetFileByIdRepository,
  IStoreFileRepository,
} from "../../src/features/files/files.repository.interface";
import { StoreInBucketRepository } from "../../src/features/files/storeInBucket/store-in-bucket.repository";
import { Client } from "minio";
import { IGetAllFilesByUserIdRepository } from "../../src/features/files/getFiles/repository/file.repository.interface";
import { GetAllFilesByUserIdRepository } from "../../src/features/files/getFiles/repository/file.repository";
import { GetFileByIdRepository } from "../../src/features/files/getFileById/get-file-by-id.repository";
import { IEditMetaDataRepository } from "../../src/features/files/editMetadata/repository/edit-meta-data.repository.interface";
import EditMetadataRepository from "../../src/features/files/editMetadata/repository/edit-meta-data-repository";
import DeleteFileRepository from "../../src/features/files/deleteFileById/repository/delete-file.repository";

export class FileStorageContainerModule {
  public static initializeModule() {
    container.register("FileStorage", {
      useValue: new Client({
        endPoint: process.env.MINIO_ENDPOINT!,
        port: 9000,
        useSSL: false,
        accessKey: "minioadmin",
        secretKey: "minioadmin",
      }),
    });

    container.register<IStoreFileRepository>(
      "StoreInBucketRepository",
      {
        useClass: StoreInBucketRepository,
      },
      { lifecycle: Lifecycle.Singleton },
    );

    container.register<IGetAllFilesByUserIdRepository>(
      "GetAllFilesByUserIdRepository",
      {
        useClass: GetAllFilesByUserIdRepository,
      },
      { lifecycle: Lifecycle.Singleton },
    );

    container.register<IGetFileByIdRepository>(
      "GetFileByIdRepository",
      {
        useClass: GetFileByIdRepository,
      },
      { lifecycle: Lifecycle.Singleton },
    );

    container.register<IEditMetaDataRepository>(
      "EditMetaDataRepository",
      {
        useClass: EditMetadataRepository,
      },
      { lifecycle: Lifecycle.Singleton },
    );
    container.register<DeleteFileRepository>(
      "DeleteFileRepository",
      {
        useClass: DeleteFileRepository,
      },
      { lifecycle: Lifecycle.Singleton },
    );
  }
}
