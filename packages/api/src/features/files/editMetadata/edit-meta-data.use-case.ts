import { inject, injectable } from "tsyringe";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import { TFileResponse, TUpdateFile } from "../../../../../core/file/file";
import { IEditMetaDataRepository } from "./repository/edit-meta-data.repository.interface";

@injectable()
export class EditMetaDataUseCase
  implements BaseUseCase<TUpdateFile, TFileResponse>
{
  constructor(
    @inject("EditMetaDataRepository")
    private readonly _editMetaDataRepository: IEditMetaDataRepository,
  ) {}
  public async handle(input: TUpdateFile) {
    return await this._editMetaDataRepository.update(input);
  }
}
