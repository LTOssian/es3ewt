import { Router } from "express";
import { CreateFileLinkRoute } from "./createFileLink/create-file-link.route";
import { DownloadFileFromLinkRoute } from "./downloadFileFromLink/dl-file-from-link.route";

export default class LinkRoute {
  public prefix_route = "/links";

  setRoutes(router: Router) {
    const linkRouter = Router();
    CreateFileLinkRoute.setRoute(linkRouter);
    DownloadFileFromLinkRoute.setRoute(linkRouter);
    router.use(this.prefix_route, linkRouter);
  }
}
