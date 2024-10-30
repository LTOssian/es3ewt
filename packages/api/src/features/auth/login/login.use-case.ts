import { container, inject, injectable } from "tsyringe";
import { TAuthRequest } from "../../../../../core/auth/auth";
import { BaseUseCase } from "../../../common/interface/base.use-case";
import { IAuthRepository } from "../repository/auth.repository.interface";
import {
  BadPasswordError,
  UserNotFoundError,
} from "../../../../../core/auth/auth.error";
import bcrypt from "bcrypt";
import { GenerateSessionTokenUseCase } from "../session/generate-session-token.use-case";
import { CreateSessionUseCase } from "../session/create-session.use-case";

@injectable()
export class LoginUseCase implements BaseUseCase<TAuthRequest, string> {
  constructor(
    @inject("AuthRepository") private readonly _authRepository: IAuthRepository,
  ) {}

  public async handle(credentials: TAuthRequest): Promise<string> {
    const user = await this._authRepository.findByUsername(
      credentials.username,
    );
    if (!user) throw new UserNotFoundError({});

    // const isPasswordValid = await bcrypt.compare(
    //   credentials.password,
    //   user.password,
    // );
    const isPasswordValid = credentials.password === user.password;
    if (!isPasswordValid) throw new BadPasswordError({});

    const token = await container.resolve(GenerateSessionTokenUseCase).handle();

    await container
      .resolve(CreateSessionUseCase)
      .handle({ token, userId: user.id });

    return token;
  }
}
