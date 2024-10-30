import { injectable, inject } from "tsyringe";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import { IHealthRepository } from "../repository/health.repository.interface";
import { HealthError } from "../../../../../core/health/health.error";

@injectable()
export class GetHealthUseCase
  implements BaseUseCase<{ ping: string }, { pong: string }>
{
  constructor(
    @inject("HealthRepository")
    private readonly _healthRepository: IHealthRepository,
  ) {}

  public async handle(credentials: {
    ping: string;
  }): Promise<{ pong: string }> {
    const isHealthy = await this._healthRepository.getHealth();

    if (!isHealthy) {
      throw new HealthError({
        details: { attemptedPing: credentials.ping },
      });
    }

    return { pong: credentials.ping };
  }
}
