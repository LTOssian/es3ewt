import { injectable } from "tsyringe";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import * as jwt from "jsonwebtoken";
import fastifyJwt from "fastify-jwt";

@injectable()
export class GenerateJwtUseCase
  implements BaseUseCase<{ userId: number }, string>
{
  public async handle(credentials: { userId: number }): Promise<string> {
    // return fastifyJwt.sign({ userId: credentials.userId }, process.env.JWT_SECRET!, {
    //       expiresIn: process.env.JWT_EXPIRATION,
    //     });
  }
}
