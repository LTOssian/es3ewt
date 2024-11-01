import { Router } from "express";
import { container } from "tsyringe";
import { authorizationMiddleware } from "../../../common/presentation/authorization.middleware";
import { GetUserLimitController } from "./get-user-limit.controller";

export class GetUserLimitRoute {
  public static setRoute(router: Router) {
    router.get(
      "/limit",
      authorizationMiddleware,
      container.resolve(GetUserLimitController).handle as any,
    );
  }
}
