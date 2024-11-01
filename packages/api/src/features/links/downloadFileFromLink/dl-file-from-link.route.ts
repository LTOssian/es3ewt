import { Router } from "express";
import { authorizationMiddleware } from "../../../common/presentation/authorization.middleware";
import { container } from "tsyringe";
import { ValidateLinkController } from "../validateLink/validate-link.controller";
import { DownloadFileFromLinkController } from "./dl-file-from-link.controller";
import { GetLinkInformationsController } from "./get-link-informations.controller";

export class DownloadFileFromLinkRoute {
  public static setRoute(router: Router) {
    router.get(
      "/shared/:linkId",
      container.resolve(ValidateLinkController).handle,
      container.resolve(GetLinkInformationsController).handle,
    );

    router.post(
      "/shared/:linkId",
      container.resolve(ValidateLinkController).handle,
      container.resolve(DownloadFileFromLinkController).handle,
    );
  }
}
