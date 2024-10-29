import { IHealthRepository } from "../../../src/features/health/repository/health.repository.interface";

export class MockFailHealthRepository implements IHealthRepository {
  getHealth(): Promise<boolean> {
    return Promise.resolve(false);
  }
}
