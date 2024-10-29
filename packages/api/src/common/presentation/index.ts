import fastify, {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { initializeContainer } from "../../../di/container";
import { ZodError } from "zod";

export class App {
  private readonly _app: FastifyInstance;
  private readonly _app_port: number = parseInt(process.env?.PORT || "8080");

  constructor(appInit: { routes: Array<any> }) {
    this._app = fastify({ logger: process.env.NODE_ENV !== "test" });

    initializeContainer();
    this.initializeRoutes(appInit.routes);
    this.initializeErrorHandler();
  }

  private initializeRoutes(routes: Array<any>) {
    routes.forEach((route) => {
      let router = new route();
      this._app.register(router.setRoutes, {
        prefix: router.prefix_route,
      });
    });

    this._app.get("/healthcheck", async (_request, reply) => {
      reply.send({ healthcheck: "server is alive" });
    });
  }

  private initializeErrorHandler() {
    this._app.setErrorHandler(
      (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
        request.log.error(error);

        if (error instanceof ZodError) {
          // Handle Zod validation errors
          reply.status(400).send({
            statusCode: 400,
            error: "Validation Error",
            message: "Invalid request data",
            details: error.errors.map((err) => ({
              path: err.path.join("."),
              message: err.message,
            })),
          });
        } else if (error.validation) {
          // Handle Fastify validation errors (if applicable)
          reply.status(400).send({
            statusCode: 400,
            error: "Bad Request",
            message: error.message,
            details: error.validation,
          });
        } else if (error.statusCode) {
          reply.status(error.statusCode).send({ error });
        } else {
          reply.status(500).send({
            statusCode: 500,
            error: "Internal Server Error",
            message: "Something went wrong!",
          });
        }
      },
    );
  }

  public listen() {
    this._app.listen(
      {
        port: process.env.NODE_ENV === "test" ? 0 : this._app_port,
        host: "0.0.0.0",
      },
      (err, adress) => {
        if (err) {
          this._app.log.error(err);
          process.exit(1);
        }

        this._app.log.info(`App listening on the ${adress}`);
      },
    );
  }

  public getFastify = () => this._app;
}
