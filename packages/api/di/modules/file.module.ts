import { container, Lifecycle } from "tsyringe";
import { IStoreFileRepository } from "../../src/features/files/files.repository.interface";
import { StoreInBucketRepository } from "../../src/features/files/storeInBucket/store-in-bucket.repository";
import { Client } from "minio";
import { IGetAllFilesByUserIdRepository } from "../../src/features/files/getFiles/repository/file.repository.interface";
import { GetAllFilesByUserIdRepository } from "../../src/features/files/getFiles/repository/file.repository";

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
  }
}
