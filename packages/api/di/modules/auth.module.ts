import { container, Lifecycle } from "tsyringe";
import { AuthRepository } from "../../src/features/auth/repository/auth.repository";
import { IAuthRepository } from "../../src/features/auth/repository/auth.repository.interface";
import { BaseUseCase } from "../../src/common/interface/base.use-case";

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
