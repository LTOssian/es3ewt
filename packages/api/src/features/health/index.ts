import { GetHealthRoute } from "./getHealth/get-health.route";
import { Router } from "express";

export default class HealthRoute {
  public prefix_route = "/health";

  setRoutes(router: Router) {
    const healthRouter = Router();
    GetHealthRoute.setRoute(healthRouter);
    router.use(this.prefix_route, healthRouter);
  }
}
