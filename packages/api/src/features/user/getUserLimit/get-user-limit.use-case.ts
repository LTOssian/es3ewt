import { injectable } from "tsyringe";
import {
  TGetUserLimitRequest,
  TGetUserLimitResponse,
} from "../../../../../core/user/user";
import { BaseUseCase } from "../../../common/interface/base.use-case";

@injectable()
export class GetUserLimitUseCase
  implements BaseUseCase<TGetUserLimitRequest, TGetUserLimitResponse>
{
  constructor() // @inject("HealthRepository")
  // private readonly _healthRepository: IHealthRepository,
  {}

  public async handle(
    credentials: TGetUserLimitRequest,
  ): Promise<TGetUserLimitResponse> {
    // const isHealthy = await this._healthRepository.getHealth();

    // if (!isHealthy) {
    //   throw new HealthError({
    //     details: { attemptedPing: credentials.ping },
    //   });
    // }

    return { totalSize: 0 };
  }
}
