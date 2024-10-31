import { container, injectable } from "tsyringe";
import { BaseController } from "../../../common/interface/base.controller";
import { NextFunction, Request, Response } from "express";
import {
  getFileByUserIdRequestSchema,
  TFileResponse,
  TGetFileByIdRequest,
  TGetFileByUserIdRequest,
} from "../../../../../core/file/file";
import { GetFileUseCase } from "./get-file.use-case";

@injectable()
export class GetFileController extends BaseController<TGetFileByUserIdRequest> {
  async handle(
    request: Request<TGetFileByUserIdRequest>,
    response: Response<TFileResponse[]>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const useCase = container.resolve(GetFileUseCase);

      const result = await useCase.handle(request.auth!);

      response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
