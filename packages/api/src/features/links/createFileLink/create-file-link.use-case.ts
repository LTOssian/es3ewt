import { inject, injectable } from "tsyringe";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import { ICreateFileLinkRepository } from "./repository/create-file-link.interface.repository";

@injectable()
export class CreateFileLinkUseCase
  implements
    BaseUseCase<{ userId: string; fileId: string }, { linkPath: string }>
{
  constructor(
    @inject("CreateFileLinkRepository")
    private readonly _createFileLinkRepository: ICreateFileLinkRepository,
  ) {}
  public async handle(credentials: {
    userId: string;
    fileId: string;
  }): Promise<{ linkPath: string; method: "GET" | "POST" }> {
    const res = await this._createFileLinkRepository.create(credentials);

    return { linkPath: `/links/shared/${res}`, method: "GET" };
  }
}
