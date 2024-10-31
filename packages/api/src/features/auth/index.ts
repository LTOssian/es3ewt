import { LoginRoute } from "./login/login.route";
import { RegisterRoute } from "./register/register.route";
import { Router } from "express";

export default class AuthRoute {
  public prefix_route = "/auth";

  setRoutes(router: Router) {
    const authRouter = Router();
    LoginRoute.setRoute(authRouter);
    RegisterRoute.setRoute(authRouter);
    router.use(this.prefix_route, authRouter);
  }
}
