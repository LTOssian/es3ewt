import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { LoginRoute } from "./login/login.route";
import { RegisterRoute } from "./register/register.route";

export default class AuthRoute {
  public prefix_route = "/auth";

  setRoutes(
    fastify: FastifyInstance,
    _options: FastifyPluginOptions,
    done: any,
  ) {
    LoginRoute.setRoute(fastify);
    RegisterRoute.setRoute(fastify);
    done();
  }
}
