import "reflect-metadata";
import { container, injectable } from "tsyringe";
import { BaseController } from "../../../common/interface/base.controller";
import {
  healthRequestSchema,
  THealthRequest,
  THealthResponse,
} from "../../../../../core/health/health";
import { FastifyRequest, FastifyReply } from "fastify";
import { GetHealthUseCase } from "./get-health.use-case";

@injectable()
export class GetHealthController extends BaseController<
  { Querystring: THealthRequest },
  THealthResponse
> {
  async handle(
    request: FastifyRequest<{ Querystring: THealthRequest }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const validCredentials = healthRequestSchema.parse(request.query);
      const useCase = container.resolve(GetHealthUseCase);

      const result = await useCase.handle(validCredentials);

      return reply.code(200).send(result);
    } catch (error) {
      throw error;
    }
  }
}
