import { container } from "tsyringe";
import { HealthContainerModule } from "./modules/health.module";
import { DatabaseContainerModule } from "./modules/database.module";
import { AuthContainerModule } from "./modules/auth.module";
import { FileStorageContainerModule } from "./modules/file.module";
import { LinkContainerModule } from "./modules/link.module";

export const initializeContainer = () => {
  container.clearInstances();
  HealthContainerModule.initializeModule();
  DatabaseContainerModule.initializeModule();
  AuthContainerModule.initializeModule();
  FileStorageContainerModule.initializeModule();
  LinkContainerModule.initializeModule();
};

export const destroyContainer = () => {
  container.clearInstances();
};
