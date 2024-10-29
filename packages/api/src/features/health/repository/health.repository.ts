import { inject, injectable } from "tsyringe";
import { IHealthRepository } from "./health.repository.interface";
import { Knex } from "knex";

@injectable()
export class HealthRepository implements IHealthRepository {
  constructor(@inject("Database") private readonly db: Knex) {}

  async getHealth(): Promise<boolean> {
    try {
      await this.db.raw("SELECT 1");
      return true;
    } catch (error) {
      console.error("Database connection failed:", error);
      return false;
    }
  }
}
