import { container, Lifecycle } from "tsyringe";
import { AuthRepository } from "../../src/features/auth/repository/auth.repository";
import { IAuthRepository } from "../../src/features/auth/repository/auth.repository.interface";

export class AuthContainerModule {
  public static initializeModule() {
    container.register<IAuthRepository>(
      "AuthRepository",
      {
        useClass: AuthRepository,
      },
      { lifecycle: Lifecycle.Singleton },
    );
  }
}
