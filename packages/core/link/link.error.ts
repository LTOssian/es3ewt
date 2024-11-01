export class LinkNotFoundError extends Error {
  public readonly statusCode: number = 404;

  constructor(credentials?: { message?: string }) {
    super(credentials?.message || "Link not found");
    this.name = this.constructor.name;
  }
}

export class LinkExpiredError extends Error {
  public readonly statusCode: number = 401;

  constructor(credentials?: { message?: string }) {
    super(credentials?.message || "Link has expired");
    this.name = this.constructor.name;
  }
}
