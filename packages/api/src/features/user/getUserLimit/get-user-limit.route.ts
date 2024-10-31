import { Router } from "express";
import { container } from "tsyringe";
import { GetUserLimitController } from "./get-user-limit.controller";

export class GetUserLimitRoute {
  public static setRoute(router: Router) {
    router.get("/limit", container.resolve(GetUserLimitController).handle);
  }
}
