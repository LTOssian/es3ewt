import { GetHealthController } from "./get-health.controller";
import { container } from "tsyringe";
import { Router } from "express";

export class GetHealthRoute {
  public static setRoute(router: Router) {
    router.get("/", container.resolve(GetHealthController).handle);
  }
}
