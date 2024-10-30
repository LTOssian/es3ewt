import { container } from "tsyringe";
import { LoginController } from "./login.controller";
import { Router } from "express";

export class LoginRoute {
  public static setRoute(router: Router) {
    router.post("/login", container.resolve(LoginController).handle);
  }
}
