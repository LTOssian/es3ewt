import { Router } from "express";
import { authorizationMiddleware } from "../../../common/presentation/authorization.middleware";
import { container } from "tsyringe";
import { GetFileByIdController } from "./get-file-by-id.controller";

export class GetFileByIdRoute {
  public static setRoute(router: Router) {
    router.get(
      "/:fileId",
      authorizationMiddleware,
      container.resolve(GetFileByIdController).handle,
    );
  }
}
