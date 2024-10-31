export interface IValidateLinkRepository {
  create(credentials: { linkId: string }): Promise<boolean>;
}
