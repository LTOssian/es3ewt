import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { GetHealthRoute } from "./getHealth/get-health.route";

export default class HealthRoute {
  public prefix_route = "/health";

  setRoutes(
    fastify: FastifyInstance,
    _options: FastifyPluginOptions,
    done: any,
  ) {
    GetHealthRoute.setRoute(fastify);
    done();
  }
}
