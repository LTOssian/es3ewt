import { inject, injectable } from "tsyringe";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import { TFileResponse } from "../../../../../core/file/file";
import { IGetFileByIdRepository } from "../files.repository.interface";

@injectable()
export class GetFileByIdUseCase
  implements BaseUseCase<{ userId: string; fileId: string }, TFileResponse>
{
  constructor(
    @inject("GetFileByIdRepository")
    private readonly _fileByIdRepository: IGetFileByIdRepository,
  ) {}

  public async handle(credentials: {
    userId: string;
    fileId: string;
  }): Promise<{
    id: string;
    path: string;
    name: string;
    user_id: string;
    size: number;
    lastUpdate: Date;
  }> {
    return await this._fileByIdRepository.get(credentials);
  }
}
