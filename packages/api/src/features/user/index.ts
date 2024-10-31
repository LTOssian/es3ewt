import { Router } from "express";
import { GetUserLimitRoute } from "./getUserLimit/get-user-limit.route";

export default class userRoute {
  public prefix_route = "/user";

  setRoutes(router: Router) {
    const userRouter = Router();
    GetUserLimitRoute.setRoute(userRouter);
    router.use(this.prefix_route, userRouter);
  }
}
