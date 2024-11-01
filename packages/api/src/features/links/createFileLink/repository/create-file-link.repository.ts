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

    const existingLink = await this._db("link")
      .where("file_id", credentials.fileId)
      .first();

    if (existingLink) {
      await this._db("link")
        .where("id", existingLink.id)
        .update({
          expires_at: this._db.raw("expires_at + INTERVAL '1 hour'"),
        });

      return existingLink.id;
    } else {
      const [link] = await this._db("link")
        .insert({
          file_id: credentials.fileId,
          expires_at: this._db.raw("CURRENT_TIMESTAMP + INTERVAL '1 hour'"),
        })
        .returning("id");

      return link.id;
    }
  }
}
