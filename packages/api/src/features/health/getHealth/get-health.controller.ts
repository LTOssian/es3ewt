import "reflect-metadata"; // Ensure reflect-metadata is imported for tsyringe
import { container, injectable } from "tsyringe";
import { BaseController } from "../../../common/interface/base.controller";
import {
  healthRequestSchema,
  THealthRequest,
} from "../../../../../core/health/health";
import { GetHealthUseCase } from "./get-health.use-case";
import { NextFunction, Request, Response } from "express";

@injectable()
export class GetHealthController extends BaseController<THealthRequest> {
  async handle(
    request: Request<THealthRequest>,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const validCredentials = healthRequestSchema.parse(request.query);
      const useCase = container.resolve(GetHealthUseCase);

      const result = await useCase.handle(validCredentials);

      response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
