export type SessionValidationResult =
  | { session: Session; user: Omit<User, "password"> }
  | { session: null; user: null };

export interface Session {
  id: string;
  userId: number;
  expiresAt: Date;
}
export interface User {
  id: number;
  username: string;
  password: string;
}
