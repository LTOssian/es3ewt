import { container, injectable } from "tsyringe";
import { BaseController } from "../../../common/interface/base.controller";
import { NextFunction, Request, Response } from "express";
import { TDeleteFile } from "../../../../../core/file/file";
import { DeleteFileUseCase } from "./delete-file.use-case";

@injectable()
export class DeleteFileController implements BaseController<TDeleteFile> {
  async handle(
    request: Request<TDeleteFile>,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const useCase = container.resolve(DeleteFileUseCase);
      await useCase.handle({ id: request.params.id });

      response.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
