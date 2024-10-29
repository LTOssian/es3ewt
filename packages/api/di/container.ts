import { container } from "tsyringe";
import { HealthContainerModule } from "./modules/health.module";

export const initializeContainer = () => {
  container.clearInstances();
  HealthContainerModule.initializeModule();
};

export const destroyContainer = () => {
  container.clearInstances();
};
