import { IHealthRepository } from "./health.repository.interface";

export class HealthRepository implements IHealthRepository {
  getHealth(): Promise<boolean> {
    return Promise.resolve(false);
  }
}
