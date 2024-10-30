import "reflect-metadata";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import { buildApp } from "../..";
import { destroyContainer } from "../../di/container";
import { FastifyInstance } from "fastify";

describe("Login:integration", () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = buildApp().getFastify();
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
    destroyContainer();
  });

  it("should return 200 and a success message when login is successful", async () => {
    const loginParams = {
      username: "Louisan",
      password: "abcdefg",
    };

    const response = await app.inject({
      method: "POST",
      url: "auth/login",
      payload: loginParams,
    });
    const responseJson = response.json();

    expect(response.statusCode).toBe(200);
    expect(responseJson).toHaveProperty("message", "Login successful");
    expect(responseJson).toHaveProperty("token");
  });

  it("should return 404 and a UserNotFoundError message when username is not found", async () => {
    const loginParams = {
      username: "nonexistentuser",
      password: "anyPassword",
    };

    const response = await app.inject({
      method: "POST",
      url: "auth/login",
      payload: loginParams,
    });
    const responseJson = response.json();

    expect(response.statusCode).toBe(404);
    expect(responseJson.error).toEqual("UserNotFoundError");
  });

  it("should return 401 and a BadPasswordError message when password is incorrect", async () => {
    const loginParams = {
      username: "Louisan",
      password: "wrongpassword",
    };

    const response = await app.inject({
      method: "POST",
      url: "auth/login",
      payload: loginParams,
    });
    const responseJson = response.json();

    expect(response.statusCode).toBe(401);
    expect(responseJson.error).toEqual("BadPasswordError");
    expect(responseJson.message).toEqual("Invalid password provided");
  });

  it("should return a validation error when required fields are missing", async () => {
    const loginParams = {
      username: "",
      password: "",
    };

    const response = await app.inject({
      method: "POST",
      url: "auth/login",
      payload: loginParams,
    });
    const responseJson = response.json();

    expect(response.statusCode).toBe(400);
    expect(responseJson.error).toEqual("Validation Error");
  });
});
