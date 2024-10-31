import { inject, injectable } from "tsyringe";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import { IStoreFileRepository } from "../files.repository.interface";
import { Readable } from "node:stream";
import mime from "mime";
import { BadFileRequestError } from "../../../../../core/file/file.error";

@injectable()
export class StoreInBucketUseCase
  implements
    BaseUseCase<
      { file: Buffer; filename: string; userId: string; bucketPath: string },
      string
    >
{
  constructor(
    @inject("StoreInBucketRepository")
    private readonly _storeRepository: IStoreFileRepository,
  ) {}

  public async handle(credentials: {
    file: Buffer;
    filename: string;
    userId: string;
    bucketPath?: string;
  }): Promise<string> {
    const type = mime.getType(credentials.filename);
    if (!type)
      throw new BadFileRequestError({
        message: "Could not determine file type",
      });

    const fileKey = await this._storeRepository.store({
      userId: credentials.userId,
      file: {
        buffer: credentials.file,
        filename: credentials.filename,
        size: credentials.file.length,
        mimetype: type,
        fieldname: "",
        originalname: credentials.filename,
        encoding: "",
        stream: Readable.from(credentials.file),
        destination: "",
        path: "",
      },
    });

    return `${credentials.bucketPath}/${credentials.userId}-files`;
  }
}
