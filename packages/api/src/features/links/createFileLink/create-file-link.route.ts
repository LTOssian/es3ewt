import { Router } from "express";
import { authorizationMiddleware } from "../../../common/presentation/authorization.middleware";
import { container } from "tsyringe";
import { CreateFileLinkController } from "./create-file-link.controller";

export class CreateFileLinkRoute {
  public static setRoute(router: Router) {
    router.post(
      "/:fileId",
      authorizationMiddleware,
      container.resolve(CreateFileLinkController).handle,
    );
  }
}
