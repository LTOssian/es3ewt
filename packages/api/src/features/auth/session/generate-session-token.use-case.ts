import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import { injectable } from "tsyringe";

@injectable()
export class GenerateSessionTokenUseCase implements BaseUseCase<void, string> {
  public async handle(_credentials: void): Promise<string> {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
  }
}
