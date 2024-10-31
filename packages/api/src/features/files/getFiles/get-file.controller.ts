import { container, injectable } from "tsyringe";
import { BaseController } from "../../../common/interface/base.controller";
import { NextFunction, Request, Response } from "express";
import {
  getFileRequestSchema,
  TGetFileRequest,
} from "../../../../../core/file/file";
import { GetFileUseCase } from "./get-file.use-case";

@injectable()
export class GetFileControler extends BaseController<TGetFileRequest> {
  async handle(
    request: Request<TGetFileRequest>,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const validateData = getFileRequestSchema.parse(request.query);
      const useCase = container.resolve(GetFileUseCase);

      const result = await useCase.handle(validateData);

      response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
