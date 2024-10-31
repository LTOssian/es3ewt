import { Request, Response, NextFunction } from "express";
import { ParsedQs } from "qs";
import {
  TFileResponse,
  TGetFileByIdRequest,
} from "../../../../../core/file/file";
import { BaseController } from "../../../common/interface/base.controller";
import { container } from "tsyringe";
import { GetFileByIdUseCase } from "./get-file-by-id.use-case";

export class GetFileByIdController
  implements BaseController<TGetFileByIdRequest>
{
  handle(request: Request, response: Response, next: NextFunction): void {
    try {
      const fileId = request.params.fileId;
      const userId = request?.auth?.userId || ""; // Ensure `userId` is extracted correctly based on authentication context

      const useCase = container.resolve(GetFileByIdUseCase);
      const file = useCase.handle({ userId, fileId });

      response.status(200).send(file);
    } catch (error) {
      next(error);
    }
  }
}
