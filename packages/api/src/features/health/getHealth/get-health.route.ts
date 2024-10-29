import { FastifyInstance } from "fastify";
import { GetHealthController } from "./get-health.controller";
import { container } from "tsyringe";

export class GetHealthRoute {
  public static setRoute(fastify: FastifyInstance) {
    fastify.get("", {}, container.resolve(GetHealthController).handle);
  }
}
