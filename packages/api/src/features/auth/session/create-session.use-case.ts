import { BaseUseCase } from "../../../common/interface/base.use-case";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { inject, injectable } from "tsyringe";
import { Knex } from "knex";
import { Session } from "../auth.model";
import { sha256 } from "@oslojs/crypto/sha2";

@injectable()
export class CreateSessionUseCase
  implements BaseUseCase<{ token: string; userId: number }, Session>
{
  constructor(@inject("Database") private readonly _db: Knex) {}

  public async handle(credentials: {
    token: string;
    userId: number;
  }): Promise<Session> {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(credentials.token)),
    );
    const session: Session = {
      id: sessionId,
      userId: credentials.userId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    };

    await this._db("user_session").insert({
      id: session.id,
      user_id: session.userId,
      expires_at: session.expiresAt,
    });

    return session;
  }
}
