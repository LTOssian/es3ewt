import * as zip from "@zip.js/zip.js";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { BadFileRequestError } from "../../../../../core/file/file.error";
import { UserStorageLimitExceededError } from "../../../../../core/user/user.error";
import { BaseController } from "../../../common/interface/base.controller";
import { GetUserLimitUseCase } from "../../user/getUserLimit/get-user-limit.use-case";
import { StoreInBucketUseCase } from "./store-in-bucket.use-case";
export class StoreInBucketController implements BaseController<{}> {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { file } = request;
      if (!file) {
        throw new BadFileRequestError();
      }

      const userId = request?.auth?.userId || ""; // Ensure `userId` is extracted correctly based on authentication context
      const bucketPath = `${userId}-files`;

      const userLimitUseCase = container.resolve(GetUserLimitUseCase);

      const blobWriter = new zip.BlobWriter("application/zip");
      const zipWriter = new zip.ZipWriter(blobWriter);
      await zipWriter.add(
        file.originalname,
        new zip.BlobReader(new Blob([file.buffer])),
      );
      const zipBlob = await zipWriter.close();
      const zipArrayBuffer = await zipBlob.arrayBuffer();
      const zipBuffer = Buffer.from(zipArrayBuffer);

      if (
        (await userLimitUseCase.handle({ userId: userId })).totalSize +
          zipBlob.size <=
        2 * Math.pow(1000, 3)
      ) {
        const useCase = container.resolve(StoreInBucketUseCase);
        const result = await useCase.handle({
          file: zipBuffer,
          filename: `${file.originalname}.zip`,
          userId,
          bucketPath,
        });

        response.status(200).send({ message: "File stored successfully" });
      } else {
        throw new UserStorageLimitExceededError();
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
