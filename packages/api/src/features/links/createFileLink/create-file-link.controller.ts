import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../../common/interface/base.controller";
import { fileIdRequestSchema } from "../../../../../core/file/file";
import { container } from "tsyringe";
import { CreateFileLinkUseCase } from "./create-file-link.use-case";

export class CreateFileLinkController implements BaseController<{}> {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { fileId } = fileIdRequestSchema.parse(request.params);
      const userId = request?.auth?.userId || "";

      const useCase = container.resolve(CreateFileLinkUseCase);

      const linkPath = await useCase.handle({ fileId, userId });
      response.status(201).send(linkPath);
    } catch (error) {
      next(error);
    }
  }
}
