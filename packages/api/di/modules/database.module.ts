import { container } from "tsyringe";
import { pg } from "../../src/common/infrastructure/database/database";

export class DatabaseContainerModule {
  public static initializeModule() {
    container.register("Database", {
      useValue: pg,
    });
  }
}
