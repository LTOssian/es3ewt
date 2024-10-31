import { TFileResponse } from "../../../../../../core/file/file";

export interface IFileRepository {
  getAllFilesByUserId(userId: number): Promise<TFileResponse[]>;
}
