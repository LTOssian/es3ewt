import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import { buildApp } from "../.."; // Adjust the import as necessary
import { container } from "tsyringe";
import { destroyContainer } from "../../di/container"; // Adjust the import as necessary
import { FastifyInstance } from "fastify";
import { MockSuccessHealthRepository } from "./doubles/MockSuccessHealthRepository";

describe("Auth:integration", () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = buildApp().getFastify();
    container.register("HealthRepository", {
      useClass: MockSuccessHealthRepository,
    });
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
    destroyContainer();
  });

  it("should return a validation error when query param is invalid", async () => {
    const pingParams = {
      ping: "",
    };

    const response = await app.inject({
      method: "GET",
      url: "/health",
      query: pingParams,
    });
    const responseJson = response.json();

    expect(response.statusCode).toBe(400);
    expect(responseJson.error).toEqual("Validation Error");
  });

  it("should return pong with ping value", async () => {
    const pingParams = {
      ping: "ping value",
    };
    const expected = {
      pong: pingParams.ping,
    };

    const response = await app.inject({
      method: "GET",
      url: "/health",
      query: pingParams,
    });
    const responseJson = response.json();

    expect(response.statusCode).toBe(200);
    expect(responseJson).toEqual(expected);
  });
});
