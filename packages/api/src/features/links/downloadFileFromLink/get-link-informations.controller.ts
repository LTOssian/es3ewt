import { Request, Response, NextFunction } from "express";
import { ParsedQs } from "qs";
import { BaseController } from "../../../common/interface/base.controller";
import { container } from "tsyringe";
import { GetLinkInformationsUseCase } from "./get-link-informations.use-case";

export class GetLinkInformationsController implements BaseController<{}> {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const linkId = request.params.linkId;
      const useCase = container.resolve(GetLinkInformationsUseCase);
      response.status(200).send(await useCase.handle({ linkId, response }));
    } catch (error) {
      next(error);
    }
  }
}
