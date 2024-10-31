import { RequestHandler } from "express";
import { expressjwt } from "express-jwt";

export const authorizationMiddleware = expressjwt({
  secret: process.env.JWT_SECRET!,
  algorithms: ["HS256"],
  getToken: (req) => req.cookies.token,
}) as RequestHandler;
