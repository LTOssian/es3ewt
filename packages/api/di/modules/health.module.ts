import { container, Lifecycle } from "tsyringe";
import { IHealthRepository } from "../../src/features/health/repository/health.repository.interface";
import { HealthRepository } from "../../src/features/health/repository/health.repository";

export class HealthContainerModule {
  public static initializeModule() {
    container.register<IHealthRepository>(
      "HealthRepository",
      {
        useClass: HealthRepository,
      },
      { lifecycle: Lifecycle.Singleton },
    );
  }
}
