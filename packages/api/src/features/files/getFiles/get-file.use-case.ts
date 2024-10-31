import { inject, injectable } from "tsyringe";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import { IFileRepository } from "./repository/file.repository.interface";
import { TFileResponse } from "../../../../../core/file/file";

@injectable()
export class GetFileUseCase
  implements BaseUseCase<{ userId: number }, TFileResponse[]>
{
  constructor(
    @inject("FileRepository")
    private readonly _fileRepository: IFileRepository,
  ) {}

  public async handle(credentials: {
    userId: number;
  }): Promise<TFileResponse[]> {
    const { userId } = credentials;

    const allFiles = await this._fileRepository.getAllFilesByUserId(userId);

    return allFiles;
  }
}
