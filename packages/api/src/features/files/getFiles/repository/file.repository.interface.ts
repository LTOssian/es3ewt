import {
  TFileResponse,
  TFileWithShare,
  TGetFileByUserIdRequest,
} from "../../../../../../core/file/file";

export interface IGetAllFilesByUserIdRepository {
  getAllFilesByUserId(
    credentials: TGetFileByUserIdRequest,
  ): Promise<TFileWithShare[]>;
}
