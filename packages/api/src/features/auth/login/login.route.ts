import { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { LoginController } from "./login.controller";

export class LoginRoute {
  public static setRoute(fastify: FastifyInstance) {
    fastify.post("/login", {}, container.resolve(LoginController).handle);
  }
}
