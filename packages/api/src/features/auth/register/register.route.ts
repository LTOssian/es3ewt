import { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { RegisterController } from "./register.controller";

export class RegisterRoute {
  public static setRoute(fastify: FastifyInstance) {
    fastify.post("/register", {}, container.resolve(RegisterController).handle);
  }
}
