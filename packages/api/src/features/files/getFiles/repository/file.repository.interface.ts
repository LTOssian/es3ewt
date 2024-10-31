import {
  TFileResponse,
  TGetFileByUserIdRequest,
} from "../../../../../../core/file/file";
import { TFileWithShare } from "./file.repository";

export interface IGetAllFilesByUserIdRepository {
  getAllFilesByUserId(
    credentials: TGetFileByUserIdRequest,
  ): Promise<TFileWithShare[]>;
}
