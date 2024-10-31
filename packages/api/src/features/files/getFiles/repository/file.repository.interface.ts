export interface IFileRepository {
  getAllFilesByUserId(userId: number): Promise<string[]>;
}
