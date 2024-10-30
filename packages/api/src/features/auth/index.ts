import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { LoginRoute } from "./login/login.route";

export default class AuthRoute {
  public prefix_route = "/auth";

  setRoutes(
    fastify: FastifyInstance,
    _options: FastifyPluginOptions,
    done: any,
  ) {
    LoginRoute.setRoute(fastify);
    done();
  }
}
