import { container, injectable } from "tsyringe";
import {
  TGetUserLimitRequest,
  TGetUserLimitResponse,
} from "../../../../../core/user/user";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import { GetFileUseCase } from "../../files/getFiles/get-file.use-case";

@injectable()
export class GetUserLimitUseCase
  implements BaseUseCase<TGetUserLimitRequest, TGetUserLimitResponse>
{
  private readonly _getFilesUseCase: GetFileUseCase;

  constructor() {
    this._getFilesUseCase = container.resolve(GetFileUseCase);
  }

  public async handle(
    credentials: TGetUserLimitRequest,
  ): Promise<TGetUserLimitResponse> {
    const totalSize = (await this._getFilesUseCase.handle(credentials)).reduce(
      (acc, file) => acc + file.size,
      0,
    );
    return { totalSize: totalSize };
  }
}
