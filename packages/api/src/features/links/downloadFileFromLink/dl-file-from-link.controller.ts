import { Request, Response, NextFunction } from "express";
import { ParsedQs } from "qs";
import { BaseController } from "../../../common/interface/base.controller";
import { container } from "tsyringe";
import { DownloadFileFromLinkUseCase } from "./dl-file-from-link.use-case";

export class DownloadFileFromLinkController implements BaseController<{}> {
  handle(request: Request, response: Response, next: NextFunction): void {
    try {
      const linkId = request.params.linkId;
      const useCase = container.resolve(DownloadFileFromLinkUseCase);
      useCase.handle({ linkId, response });
    } catch (error) {
      next(error);
    }
  }
}
