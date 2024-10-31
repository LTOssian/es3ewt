import { Router } from "express";
import { authorizationMiddleware } from "../../../common/presentation/authorization.middleware";
import { container } from "tsyringe";
import { ValidateLinkController } from "../validateLink/validate-link.controller";
import { DownloadFileFromLinkController } from "./dl-file-from-link.controller";

export class DownloadFileFromLinkRoute {
  public static setRoute(router: Router) {
    router.get(
      "/shared/:linkId",
      authorizationMiddleware,
      container.resolve(ValidateLinkController).handle,
      container.resolve(DownloadFileFromLinkController).handle,
    );
  }
}
