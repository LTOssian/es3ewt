import { injectable } from "tsyringe";
import { BaseController } from "../../../common/interface/base.controller";
import { FastifyRequest, FastifyReply } from "fastify";

@injectable()
export class RegisterController extends BaseController<
  { Body: { username: string; password: string } },
  void
> {
  handle(
    request: FastifyRequest<{ Body: { username: string; password: string } }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    throw new Error("Method not implemented.");
  }
}
