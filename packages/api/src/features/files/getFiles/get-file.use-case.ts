import { inject, injectable } from "tsyringe";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import { IGetAllFilesByUserIdRepository } from "./repository/file.repository.interface";
import {
  TFileResponse,
  TGetFileByUserIdRequest,
} from "../../../../../core/file/file";

@injectable()
export class GetFileUseCase
  implements BaseUseCase<TGetFileByUserIdRequest, TFileResponse[]>
{
  constructor(
    @inject("GetAllFilesByUserIdRepository")
    private readonly _fileRepository: IGetAllFilesByUserIdRepository,
  ) {}

  public async handle(
    credentials: TGetFileByUserIdRequest,
  ): Promise<TFileResponse[]> {
    const allFiles =
      await this._fileRepository.getAllFilesByUserId(credentials);

    return allFiles;
  }
}
