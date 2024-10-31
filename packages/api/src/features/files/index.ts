import { Router } from "express";
import { StoreInBucketRoute } from "./storeInBucket/store-in-bucket.route";
import { GetFileRoute } from "./getFiles/get-file.route";
import { GetFileByIdRoute } from "./getFileById/get-file-by-id.route";

export default class FileRoute {
  public prefix_route = "/files";

  setRoutes(router: Router) {
    const fileRouter = Router();
    GetFileByIdRoute.setRoute(fileRouter);
    StoreInBucketRoute.setRoute(fileRouter);
    router.use(this.prefix_route, fileRouter);
    GetFileRoute.setRoute(fileRouter);
  }
}
