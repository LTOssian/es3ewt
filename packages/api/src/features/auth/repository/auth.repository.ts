import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { IAuthRepository } from "./auth.repository.interface";
import { User } from "../auth.model";

@injectable()
export class AuthRepository implements IAuthRepository {
  constructor(@inject("Database") private readonly db: Knex) {}

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.db<User>("user").where({ username }).first();
    return user || null;
  }
}
