import { inject, injectable } from "tsyringe";
import { Knex } from "knex";
import { IValidateLinkRepository } from "./validate-link.interface.repository";
import {
  LinkNotFoundError,
  LinkExpiredError,
} from "../../../../../../core/link/link.error";

@injectable()
export class ValidateLinkRepository implements IValidateLinkRepository {
  constructor(@inject("Database") private readonly _db: Knex) {}
  async create(credentials: { linkId: string }): Promise<boolean> {
    const link = await this._db("link")
      .where({ id: credentials.linkId })
      .select("expires_at")
      .first();

    if (!link) {
      throw new LinkNotFoundError();
    }
    const currentDateTime = new Date();
    if (link.expires_at && link.expires_at < currentDateTime) {
      throw new LinkExpiredError();
    }
    return true;
  }
}
