import "reflect-metadata";
import { App } from "./src/common/presentation";
import { routes } from "./src/common/presentation/routes";

export const buildApp = () => {
  return new App({ routes });
};

const app = buildApp();

app.listen();
