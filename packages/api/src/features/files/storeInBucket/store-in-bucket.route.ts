import { RequestHandler, Router } from "express";
import { StoreInBucketController } from "./store-in-bucket.controller";
import { container } from "tsyringe";
import multer from "multer";
import { expressjwt } from "express-jwt";

export class StoreInBucketRoute {
  public static setRoute(router: Router) {
    const storage = multer.memoryStorage();
    const upload = multer({ storage });
    const jwt = expressjwt({
      secret: process.env.JWT_SECRET!,
      algorithms: ["HS256"],
      getToken: (req) => req.cookies.token,
    }) as RequestHandler;

    router.post(
      "/",
      upload.single("file"),
      jwt,
      container.resolve(StoreInBucketController).handle,
    );
  }
}
