import { User } from "../auth.model";

export interface IAuthRepository {
  findByUsername(username: string): Promise<User | null>;
}
