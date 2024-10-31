export class BadFileRequestError extends Error {
  public readonly statusCode: number = 400;

  constructor(credentials?: { message?: string }) {
    super(credentials?.message || "Bad file");
    this.name = this.constructor.name;
  }
}
