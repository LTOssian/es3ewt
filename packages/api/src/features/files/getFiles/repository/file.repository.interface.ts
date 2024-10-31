import {
  TFileResponse,
  TGetFileByUserIdRequest,
} from "../../../../../../core/file/file";

export interface IGetAllFilesByUserIdRepository {
  getAllFilesByUserId(
    credentials: TGetFileByUserIdRequest,
  ): Promise<TFileResponse[]>;
}
