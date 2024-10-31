export interface IStoreFileRepository {
  store(credentials: {
    userId: string;
    file: Express.Multer.File;
  }): Promise<void>;
}
