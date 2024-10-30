import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import request from "supertest";
import { buildApp } from "../..";
import { container } from "tsyringe";
import { destroyContainer } from "../../di/container";
import { Express } from "express";
import { MockSuccessHealthRepository } from "./doubles/MockSuccessHealthRepository";

describe("Health:integration", () => {
  let app: Express;

  beforeEach(() => {
    app = buildApp().getExpress();
    container.register("HealthRepository", {
      useClass: MockSuccessHealthRepository,
    });
  });

  afterEach(() => {
    destroyContainer();
  });

  it("should return a validation error when query param is invalid", async () => {
    const pingParams = {
      ping: "",
    };

    const response = await request(app).get("/health").query(pingParams);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toEqual("Validation Error");
  });

  it("should return pong with ping value", async () => {
    const pingParams = {
      ping: "ping value",
    };
    const expected = {
      pong: pingParams.ping,
    };

    const response = await request(app).get("/health").query(pingParams);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expected);
  });
});
