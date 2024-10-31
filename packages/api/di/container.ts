import { container } from "tsyringe";
import { HealthContainerModule } from "./modules/health.module";
import { DatabaseContainerModule } from "./modules/database.module";
import { AuthContainerModule } from "./modules/auth.module";
import { FileStorageContainerModule } from "./modules/file.module";

export const initializeContainer = () => {
  container.clearInstances();
  HealthContainerModule.initializeModule();
  DatabaseContainerModule.initializeModule();
  AuthContainerModule.initializeModule();
  FileStorageContainerModule.initializeModule();
};

export const destroyContainer = () => {
  container.clearInstances();
};
