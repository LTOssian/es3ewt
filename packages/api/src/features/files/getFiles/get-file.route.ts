export class GetFileRoute {
  public static setRoute(router: any) {
    router.get("getAllFiles", container.resolve(GetFileController).handle);
  }
}
