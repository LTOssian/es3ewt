import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../../common/interface/base.controller";
import { container } from "tsyringe";
import { ValidateLinkUseCase } from "./validate-link.use-case";
import { linkIdRequestSchema } from "../../../../../core/link/link";

export class ValidateLinkController implements BaseController<{}> {
  async handle(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const validLinkId = linkIdRequestSchema.parse(request.params);
      const useCase = container.resolve(ValidateLinkUseCase);
      if (await useCase.handle(validLinkId)) next();
    } catch (error) {
      next(error);
    }
  }
}
