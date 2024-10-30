import { injectable } from "tsyringe";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import jwt from "jsonwebtoken";

@injectable()
export class GenerateJwtUseCase
  implements BaseUseCase<{ userId: number }, string>
{
  public async handle(credentials: { userId: number }): Promise<string> {
    const secret = process.env.JWT_SECRET!;
    const expiration = process.env.JWT_EXPIRATION || "1h";

    return jwt.sign({ userId: credentials.userId }, secret, {
      expiresIn: expiration,
    });
  }
}
