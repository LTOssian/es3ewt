import { inject, injectable } from "tsyringe";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import { IFileRepository } from "./repository/file.repository.interface";
import { IStoreFileRepository } from "../files.repository.interface";

@injectable()
export class GetFileUseCase
  implements BaseUseCase<{ userId: number }, { files: string[] }>
{
  constructor(
    @inject("FileRepository")
    private readonly _fileRepository: IFileRepository,
  ) {}

  public async handle(credentials: {
    userId: number;
  }): Promise<{ files: string[] }> {
    const { userId } = credentials;

    const allFiles = await this._fileRepository.getAllFilesByUserId(userId);

    return allFiles;
  }
}
