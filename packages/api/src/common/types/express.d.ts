// express.d.ts
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        iat: number;
        exp: number;
      };
    }
  }
}