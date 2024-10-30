import "reflect-metadata";

import { container } from "tsyringe";
import { GetHealthUseCase } from "../../src/features/health/getHealth/get-health.use-case";
import { destroyContainer, initializeContainer } from "../../di/container";
import { HealthError } from "../../../core/health/health.error";
import { MockSuccessHealthRepository } from "./doubles/MockSuccessHealthRepository";
import { MockFailHealthRepository } from "./doubles/MockFailHealthRepository";

describe("Health:unit", () => {
  beforeEach(() => {
    initializeContainer();
  });
  afterEach(() => {
    destroyContainer();
  });

  it("Should return pong with the correct value", async () => {
    container.register("HealthRepository", {
      useClass: MockSuccessHealthRepository,
    });
    const pingCredential = {
      ping: "ping value",
    };
    const expectedPond = {
      pong: pingCredential.ping,
    };
    const healthUseCase = container.resolve(GetHealthUseCase);

    const result = await healthUseCase.handle(pingCredential);

    expect(result).toEqual(expectedPond);
  });

  it("Should throw healthError", async () => {
    container.register("HealthRepository", {
      useClass: MockFailHealthRepository,
    });
    const pingCredential = {
      ping: "ping value",
    };
    const healthUseCase = container.resolve(GetHealthUseCase);

    const result = async () => await healthUseCase.handle(pingCredential);

    expect(result).rejects.toThrow(HealthError);
  });
});
