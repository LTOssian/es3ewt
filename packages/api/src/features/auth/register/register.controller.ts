import { container, injectable } from "tsyringe";
import { BaseController } from "../../../common/interface/base.controller";
import { authRequestSchema, TAuthRequest } from "../../../../../core/auth/auth";
import { RegisterUseCase } from "./register.use-case";
import { NextFunction, Request, Response } from "express";

@injectable()
export class RegisterController extends BaseController<{ Body: TAuthRequest }> {
  async handle(
    request: Request<{ Body: TAuthRequest }>,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const validCredentials = authRequestSchema.parse(request.body);
      const useCase = container.resolve(RegisterUseCase);

      await useCase.handle(validCredentials);

      response.status(201).send();
    } catch (error) {
      next(error);
    }
  }
}
