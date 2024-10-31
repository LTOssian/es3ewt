import { Router } from "express";
import { StoreInBucketRoute } from "./storeInBucket/store-in-bucket.route";
import { GetFileRoute } from "./getFiles/get-file.route";

export default class FileRoute {
  public prefix_route = "/files";

  setRoutes(router: Router) {
    const fileRouter = Router();
    StoreInBucketRoute.setRoute(fileRouter);
    router.use(this.prefix_route, fileRouter);
    GetFileRoute.setRoute(fileRouter);
  }
}
