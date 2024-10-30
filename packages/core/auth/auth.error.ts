export class UserNotFoundError extends Error {
  public readonly statusCode: number = 404;

  constructor(credentials: { message?: string }) {
    super(credentials?.message || "User not found");
    this.name = this.constructor.name;
  }
}

export class BadPasswordError extends Error {
  public readonly statusCode: number = 401;

  constructor(credentials: { message?: string }) {
    super(credentials?.message || "Invalid password provided");
    this.name = this.constructor.name;
  }
}
