import { FastifyRequest, FastifyReply } from "fastify";
import { BaseController } from "../../../common/interface/base.controller";
import { VerifyJwtUseCase } from "./verify-jwt.use-case";
import { container } from "tsyringe";

export class AuthorizeJwtUseCase
  implements BaseController<{ Headers: { authorization: string } }, void>
{
  handle(
    request: FastifyRequest<{ Headers: { authorization: string } }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("test");
    const decoded = container.resolve(VerifyJwtUseCase).handle({ token });
    request.user;
  }
}
