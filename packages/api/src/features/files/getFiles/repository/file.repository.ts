import { inject, injectable } from "tsyringe";
import { IFileRepository } from "./file.repository.interface";
import { Knex } from "knex";
import { TFileResponse } from "../../../../../../core/file/file";

@injectable()
export class FileRepository implements IFileRepository {
  constructor(@inject("Database") private readonly db: Knex) {}

  getAllFilesByUserId(userId: number): Promise<TFileResponse[]> {
    return this.db("file").where("user_id", userId);
  }
}
