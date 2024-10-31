import { inject, injectable } from "tsyringe";
import { Knex } from "knex";
import { FileNotFoundError } from "../../../../../../core/file/file.error";
import { ICreateFileLinkRepository } from "./create-file-link.interface.repository";

@injectable()
export class CreateFileLinkRepository implements ICreateFileLinkRepository {
  constructor(@inject("Database") private readonly _db: Knex) {}

  async create(credentials: {
    userId: string;
    fileId: string;
  }): Promise<string> {
    const fileExists = await this._db("file")
      .where({
        id: credentials.fileId,
        user_id: credentials.userId,
      })
      .first();

    if (!fileExists) throw new FileNotFoundError();

    const [link] = await this._db("link")
      .insert({
        file_id: credentials.fileId,
      })
      .returning("id");

    return link.id;
  }
}
