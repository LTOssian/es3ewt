import { NextFunction, Request, Response } from "express";
import "reflect-metadata"; // Ensure reflect-metadata is imported for tsyringe
import { container, injectable } from "tsyringe";
import { TGetUserLimitRequest } from "../../../../../core/user/user";
import { BaseController } from "../../../common/interface/base.controller";
import { GetUserLimitUseCase } from "./get-user-limit.use-case";

@injectable()
export class GetUserLimitController extends BaseController<TGetUserLimitRequest> {
  async handle(
    request: Request<TGetUserLimitRequest>,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const useCase = container.resolve(GetUserLimitUseCase);

      const result = await useCase.handle({ userId: request.auth?.userId! });

      response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
