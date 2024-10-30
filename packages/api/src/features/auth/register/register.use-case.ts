import { inject, injectable } from "tsyringe";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import { TAuthRequest } from "../../../../../core/auth/auth";
import { IAuthRepository } from "../repository/auth.repository.interface";
import { UserAlreadyExistsError } from "../../../../../core/auth/auth.error";
import bcrypt from "bcrypt";

@injectable()
export class RegisterUseCase implements BaseUseCase<TAuthRequest, void> {
  constructor(
    @inject("AuthRepository") private readonly _authRepository: IAuthRepository,
  ) {}
  public async handle(credentials: TAuthRequest): Promise<void> {
    const userExists = await this._authRepository.findByUsername(
      credentials.username,
    );
    if (userExists) throw new UserAlreadyExistsError();

    credentials.password = await bcrypt.hash(credentials.password, 10);

    await this._authRepository.saveUser(credentials);
  }
}
