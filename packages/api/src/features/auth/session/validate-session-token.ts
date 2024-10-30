import { Knex } from "knex";
import { injectable, inject, container } from "tsyringe";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import { Session, SessionValidationResult, User } from "../auth.model";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { InvalidateSessionUseCase } from "./invalidate-session";

@injectable()
export class ValidateSessionTokenUseCase
  implements BaseUseCase<{ token: string }, SessionValidationResult>
{
  constructor(@inject("Database") private readonly _db: Knex) {}

  public async handle(credentials: {
    token: string;
  }): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(credentials.token)),
    );
    const row = await this._db("user_session")
      .join("user", { "user.id": "user_session.id" })
      .select(
        "user_session.id",
        "user_session.user_id",
        "user_session.expires_at",
        "user.id as user_id",
        "user.username as username",
      )
      .where("user_session.id", sessionId)
      .first();

    if (row === null) {
      return { session: null, user: null };
    }
    const session: Session = {
      id: row.id,
      userId: row.user_id,
      expiresAt: new Date(row.expires_at),
    };
    const user: Omit<User, "password"> = {
      id: row.user_id,
      username: row.username,
    };

    if (Date.now() >= session.expiresAt.getTime()) {
      const invalidateSessionUseCase = container.resolve(
        InvalidateSessionUseCase,
      );
      await invalidateSessionUseCase.handle({ sessionId: session.id });
      return { session: null, user: null };
    }
    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
      session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
      this._db("user_session").where("id", "=", session.id).update({
        expires_at: session.expiresAt,
      });
    }

    return { session, user };
  }
}
