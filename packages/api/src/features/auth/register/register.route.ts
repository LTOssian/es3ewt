import { container } from "tsyringe";
import { RegisterController } from "./register.controller";
import { Router } from "express";

export class RegisterRoute {
  public static setRoute(router: Router) {
    router.post("/register", container.resolve(RegisterController).handle);
  }
}
