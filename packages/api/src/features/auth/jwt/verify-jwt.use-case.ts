import { injectable } from "tsyringe";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

@injectable()
export class VerifyJwtUseCase
  implements BaseUseCase<{ token: string }, JwtPayload | string>
{
  public async handle(credentials: {
    token: string;
  }): Promise<JwtPayload | string> {
    return jwt.verify(credentials.token, process.env.JWT_SECRET!);
  }
}
