import { container, injectable } from "tsyringe";
import { BaseController } from "../../../common/interface/base.controller";
import { FastifyRequest, FastifyReply } from "fastify";
import { authRequestSchema, TAuthRequest } from "../../../../../core/auth/auth";
import { RegisterUseCase } from "./register.use-case";

@injectable()
export class RegisterController extends BaseController<
  { Body: TAuthRequest },
  void
> {
  async handle(
    request: FastifyRequest<{ Body: TAuthRequest }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const validCredentials = authRequestSchema.parse(request.body);
      const useCase = container.resolve(RegisterUseCase);

      await useCase.handle(validCredentials);

      return reply.code(201).send();
    } catch (error) {
      throw error;
    }
  }
}
