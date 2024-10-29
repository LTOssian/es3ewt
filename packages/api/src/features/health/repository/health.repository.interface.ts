export interface IHealthRepository {
  getHealth(): Promise<boolean>;
}
