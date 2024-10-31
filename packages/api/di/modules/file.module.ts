import { container, Lifecycle } from "tsyringe";
import { IStoreFileRepository } from "../../src/features/files/files.repository.interface";
import { StoreInBucketRepository } from "../../src/features/files/storeInBucket/store-in-bucket.repository";
import { Client } from "minio";

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
  }
}
