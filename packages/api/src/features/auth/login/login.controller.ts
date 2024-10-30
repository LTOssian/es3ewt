import { container, injectable } from "tsyringe";
import { BaseController } from "../../../common/interface/base.controller";
import { User } from "../auth.model";
import {
  authRequestSchema,
  TLoginResponse,
} from "../../../../../core/auth/auth";
import { LoginUseCase } from "./login.use-case";
import { NextFunction, Request, Response } from "express";

@injectable()
export class LoginController extends BaseController<{
  Body: { username: string; password: string };
}> {
  async handle(
    request: Request<{ Body: { username: string; password: string } }>,
    reply: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const validCredentials = authRequestSchema.parse(request.body);
      const useCase = container.resolve(LoginUseCase);

      const token = await useCase.handle(validCredentials);

      reply.status(200).send({ message: "Login successful", token });
    } catch (error) {
      next(error);
    }
  }
}
