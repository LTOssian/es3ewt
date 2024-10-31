import { container } from "tsyringe";
import { GetFileController } from "./get-file.controller";
import { authorizationMiddleware } from "../../../common/presentation/authorization.middleware";

export class GetFileRoute {
  public static setRoute(router: any) {
    router.get(
      "/me/all/",
      authorizationMiddleware,
      container.resolve(GetFileController).handle,
    );
  }
}
