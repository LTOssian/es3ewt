export abstract class BaseUseCase<TCredentials, TReturn> {
  public abstract handle(credentials: TCredentials): Promise<TReturn>;
}
