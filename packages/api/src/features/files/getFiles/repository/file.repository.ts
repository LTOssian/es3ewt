import { inject, injectable } from "tsyringe";
import { IGetAllFilesByUserIdRepository } from "./file.repository.interface";
import { Knex } from "knex";
import {
  TFileResponse,
  TGetFileByUserIdRequest,
} from "../../../../../../core/file/file";

@injectable()
export class GetAllFilesByUserIdRepository
  implements IGetAllFilesByUserIdRepository
{
  constructor(@inject("Database") private readonly db: Knex) {}

  getAllFilesByUserId(
    credentials: TGetFileByUserIdRequest,
  ): Promise<TFileResponse[]> {
    const { userId } = credentials;
    return this.db("file").where("user_id", userId);
  }
}
