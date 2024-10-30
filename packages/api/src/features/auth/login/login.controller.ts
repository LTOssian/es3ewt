import { container, injectable } from "tsyringe";
import { BaseController } from "../../../common/interface/base.controller";
import { User } from "../auth.model";
import { FastifyRequest, FastifyReply } from "fastify";
import { authRequestSchema } from "../../../../../core/auth/auth";
import { LoginUseCase } from "./login.use-case";
import { BadPasswordError } from "../../../../../core/auth/auth.error";

@injectable()
export class LoginController extends BaseController<
  { Body: { username: string; password: string } },
  User
> {
  async handle(
    request: FastifyRequest<{ Body: { username: string; password: string } }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const validCredentials = authRequestSchema.parse(request.body);
      const useCase = container.resolve(LoginUseCase);

      const token = await useCase.handle(validCredentials);

      return reply.code(200).send({ message: "Login successful", token });
    } catch (error) {
      throw error;
    }
  }
}
