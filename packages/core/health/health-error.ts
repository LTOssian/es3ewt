export interface IHealthError {
  message?: string;
  statusCode?: number;
  details?: any;
}

export class HealthError extends Error {
  public readonly statusCode: number = 503;
  public readonly details?: any;

  constructor(credentials: IHealthError) {
    super(credentials?.message || "Health check failed");
    this.name = this.constructor.name;
    this.statusCode = credentials?.statusCode || 503;
    this.details = credentials?.details || null;
  }
}
