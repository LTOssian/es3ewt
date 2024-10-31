export interface ICreateFileLinkRepository {
  create(credentials: { userId: string; fileId: string }): Promise<string>;
}
