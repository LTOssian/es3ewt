import { IHealthRepository } from "../../../src/features/health/repository/health.repository.interface";

export class MockSuccessHealthRepository implements IHealthRepository {
  getHealth(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
