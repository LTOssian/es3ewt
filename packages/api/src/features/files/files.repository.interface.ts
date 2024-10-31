export interface IStoreFileRepository {
  store(credentials: {
    userId: string;
    file: Express.Multer.File;
  }): Promise<void>;
}

export interface IGetFileByIdRepository {
  get(credentials: { fileId: string; userId: string }): Promise<any>;
}
