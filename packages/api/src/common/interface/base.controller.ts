import { NextFunction, Request, Response } from "express";

export abstract class BaseController<TRequest> {
  abstract handle(
    request: Request<TRequest>,
    response: Response,
    next: NextFunction,
  ): void;
}
