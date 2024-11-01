import { container, injectable } from "tsyringe";
import { TUpdateFile, updateFileSchema } from "../../../../../core/file/file";
import { BaseController } from "../../../common/interface/base.controller";
import { NextFunction, Request, Response } from "express";
import { EditMetaDataUseCase } from "./edit-meta-data.use-case";

@injectable()
export class EditMetaDataController implements BaseController<TUpdateFile> {
  async handle(
    request: Request<TUpdateFile>,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dataToValidate = {
        ...request.body,
        id: request.params.id,
      };
      const validateData = updateFileSchema.parse(dataToValidate);

      const useCase = container.resolve(EditMetaDataUseCase);
      const Updatedfile = await useCase.handle(validateData);

      response.status(200).send(Updatedfile);
    } catch (error) {
      next(error);
    }
  }
}
