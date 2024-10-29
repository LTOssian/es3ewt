import { container } from "tsyringe";
import { HealthContainerModule } from "./modules/health.module";
import { DatabaseContainerModule } from "./modules/database.module";

export const initializeContainer = () => {
  container.clearInstances();
  HealthContainerModule.initializeModule();
  DatabaseContainerModule.initializeModule();
};

export const destroyContainer = () => {
  container.clearInstances();
};
