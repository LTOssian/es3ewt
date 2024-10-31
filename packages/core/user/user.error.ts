export class UserStorageLimitExceededError extends Error {
  public readonly statusCode: number = 413;

  constructor(credentials?: { message?: string }) {
    super(credentials?.message || "Storage limit exceeded");
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
