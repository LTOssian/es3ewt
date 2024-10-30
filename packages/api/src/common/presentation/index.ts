import express, { ErrorRequestHandler, Request, Response } from "express";
import { initializeContainer } from "../../../di/container";
import { ZodError } from "zod";
import { expressjwt } from "express-jwt";
import { config } from "dotenv";
import {
  BadPasswordError,
  UserNotFoundError,
} from "../../../../core/auth/auth.error";
import morgan from "morgan";

config();

export class App {
  private readonly _app: express.Express;
  private readonly _app_port: number = parseInt(
    process.env.NODE_END !== "test" ? process.env.PORT! : "3000",
  );

  constructor(appInit: { routes: Array<any> }) {
    this._app = express();

    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(morgan("dev"));

    this._app.use(
      expressjwt({
        secret: process.env.JWT_SECRET!,
        algorithms: ["HS256"],
      }).unless({ path: ["/health", "/auth/login", "/auth/register"] }),
    );

    initializeContainer();
    this.initializeRoutes(appInit.routes);
    this.initializeErrorHandler();
  }

  private initializeRoutes(routes: Array<any>) {
    routes.forEach((route) => {
      const router = new route();
      router.setRoutes(this._app);
    });
  }

  private initializeErrorHandler() {
    const errorHandler: ErrorRequestHandler = (
      error: ZodError | UserNotFoundError | BadPasswordError,
      request: Request,
      response,
      next,
    ) => {
      console.log(error);
      if (error instanceof ZodError) {
        response.status(400).send({
          statusCode: 400,
          error: "Validation Error",
          message: "Invalid request data",
          details: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
      } else if (error.statusCode) {
        response.status(error.statusCode).send({
          error: error.name,
          statusCode: error.statusCode,
          message: error.message,
        });
      } else {
        response.status(500).send({
          statusCode: 500,
          error: "Internal Server Error",
          message: "Something went wrong!",
        });
      }

      next();
    };

    this._app.use(errorHandler);
  }

  public listen() {
    this._app.listen(this._app_port, "0.0.0.0", () => {
      console.log(`App listening on port ${this._app_port}`);
    });
  }

  public getExpress = () => this._app;
}
