import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../../common/interface/base.controller";
import { container } from "tsyringe";
import { StoreInBucketUseCase } from "./store-in-bucket.use-case";
import { BadFileRequestError } from "../../../../../core/file/file.error";

export class StoreInBucketController implements BaseController<{}> {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { file } = request;
      // console.log(request.auth.userId);
      const userId = request?.auth?.userId || ""; // Ensure `userId` is extracted correctly based on authentication context
      const bucketPath = `${userId}-files`;

      if (!file) {
        throw new BadFileRequestError();
      }

      const useCase = container.resolve(StoreInBucketUseCase);
      // TODO: result is the file path, use it
      const result = await useCase.handle({
        file: file.buffer,
        filename: file.originalname,
        userId,
        bucketPath,
      });

      response
        .status(200)
        .send({ message: "File stored successfully", result });
    } catch (error) {
      next(error);
    }
  }
}
