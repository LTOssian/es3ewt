import { inject, injectable } from "tsyringe";
import { TDeleteFile } from "../../../../../core/file/file";
import { IDeleteFileRepository } from "./repository/delete-file.interface.repository";
import { BaseUseCase } from "../../../common/interface/base.use-case";

@injectable()
export class DeleteFileUseCase implements BaseUseCase<TDeleteFile, void> {
  constructor(
    @inject("DeleteFileRepository")
    private readonly _deleteFileRepository: IDeleteFileRepository,
  ) {}

  public async handle(input: TDeleteFile): Promise<void> {
    return await this._deleteFileRepository.delete(input);
  }
}
