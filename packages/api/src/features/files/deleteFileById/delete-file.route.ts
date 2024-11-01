import { container } from "tsyringe";
import { authorizationMiddleware } from "../../../common/presentation/authorization.middleware";
import { Router } from "express";
import { DeleteFileController } from "./delete-file.controller";

export class DeleteFileByIdRoute {
  public static setRoute(router: Router) {
    router.delete(
      "/:id",
      authorizationMiddleware,
      container.resolve(DeleteFileController).handle,
    );
  }
}
