import { Router } from "express";
import { StoreInBucketController } from "./store-in-bucket.controller";
import { container } from "tsyringe";
import multer from "multer";
import { authorizationMiddleware } from "../../../common/presentation/authorization.middleware";

export class StoreInBucketRoute {
  public static setRoute(router: Router) {
    const storage = multer.memoryStorage();
    const upload = multer({ storage });

    router.post(
      "/",
      upload.single("file"),
      authorizationMiddleware,
      container.resolve(StoreInBucketController).handle,
    );
  }
}
