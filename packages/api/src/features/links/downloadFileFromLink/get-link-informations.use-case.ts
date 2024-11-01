import { inject, injectable } from "tsyringe";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import { Response } from "express";
import { IDownloadFileFromLinkRepository } from "./repository/dl-file-from-link.interface.repository";

@injectable()
export class GetLinkInformationsUseCase
  implements BaseUseCase<{ linkId: string; response: Response }, void>
{
  constructor(
    @inject("DownloadFileFromLinkRepository")
    private readonly _downloadFileFromLinkRepository: IDownloadFileFromLinkRepository,
  ) {}

  public async handle(credentials: {
    linkId: string;
    response: Response;
  }): Promise<void> {
    return await this._downloadFileFromLinkRepository.getInformations(
      credentials,
    );
  }
}
