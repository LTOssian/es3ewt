import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";

export abstract class BaseController<
  TRequest extends RouteGenericInterface,
  TResponse,
> {
  abstract handle(
    request: FastifyRequest<TRequest>,
    reply: FastifyReply,
  ): Promise<FastifyReply>;
}
