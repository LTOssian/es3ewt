import { Knex } from "knex";
import { injectable, inject } from "tsyringe";
import { BaseUseCase } from "../../../common/interface/base.use-case";

@injectable()
export class InvalidateSessionUseCase
  implements BaseUseCase<{ sessionId: string }, void>
{
  constructor(@inject("Database") private readonly _db: Knex) {}

  public async handle(credentials: { sessionId: string }): Promise<void> {
    await this._db("user_session").where("id", credentials.sessionId).delete();
  }
}
