import { Request, Response, NextFunction } from "express";
import {
  fileIdRequestSchema,
  TGetFileByIdRequest,
} from "../../../../../core/file/file";
import { BaseController } from "../../../common/interface/base.controller";
import { container } from "tsyringe";
import { GetFileByIdUseCase } from "./get-file-by-id.use-case";

export class GetFileByIdController
  implements BaseController<TGetFileByIdRequest>
{
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { fileId } = fileIdRequestSchema.parse(request.params);
      const userId = request?.auth?.userId || "";

      const useCase = container.resolve(GetFileByIdUseCase);
      const file = await useCase.handle({ userId, fileId });

      response.status(200).send(file);
    } catch (error) {
      next(error);
    }
  }
}
