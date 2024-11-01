import { container } from "tsyringe";
import { authorizationMiddleware } from "../../../common/presentation/authorization.middleware";
import { EditMetaDataController } from "./edit-meta-data.controller";
import { Router } from "express";

export class EditMetaDataRoute {
  public static setRoute(router: Router) {
    router.patch(
      "/:id",
      authorizationMiddleware,
      container.resolve(EditMetaDataController).handle,
    );
  }
}
