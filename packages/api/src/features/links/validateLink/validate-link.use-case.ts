import { inject, injectable } from "tsyringe";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import { IValidateLinkRepository } from "./repository/validate-link.interface.repository";

@injectable()
export class ValidateLinkUseCase
  implements BaseUseCase<{ linkId: string }, boolean>
{
  constructor(
    @inject("ValidateLinkRepository")
    private readonly _validateLinkRepository: IValidateLinkRepository,
  ) {}
  public async handle(credentials: { linkId: string }): Promise<boolean> {
    return await this._validateLinkRepository.create(credentials);
  }
}
