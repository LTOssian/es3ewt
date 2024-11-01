import { inject, injectable } from "tsyringe";
import { TDeleteFile } from "../../../../../../core/file/file";
import { Knex } from "knex";
import { IDeleteFileRepository } from "./delete-file.interface.repository";

@injectable()
export default class DeleteFileRepository implements IDeleteFileRepository {
  constructor(@inject("Database") private readonly _db: Knex) {}

  async delete(input: TDeleteFile): Promise<void> {
    const { id } = input;
    await this._db("file").where({ id }).delete();
  }
}
