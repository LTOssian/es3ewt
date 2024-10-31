import { container, injectable } from "tsyringe";
import { BaseController } from "../../../common/interface/base.controller";
import { NextFunction, Request, Response } from "express";
import {
  getFileByUserIdRequestSchema,
  TFileResponse,
  TGetFileByIdRequest,
} from "../../../../../core/file/file";
import { GetFileUseCase } from "./get-file.use-case";

@injectable()
export class GetFileController extends BaseController<TGetFileByIdRequest> {
  async handle(
    request: Request<TGetFileByIdRequest>,
    response: Response<TFileResponse[]>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const validateData = getFileByUserIdRequestSchema.parse(request.query);
      const useCase = container.resolve(GetFileUseCase);

      const result = await useCase.handle(validateData);

      response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
