import "reflect-metadata";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import { buildApp } from "../..";
import request from "supertest";
import { destroyContainer } from "../../di/container";
import { Application } from "express";
import { RegisterUseCase } from "../../src/features/auth/register/register.use-case";
import { container } from "tsyringe";

describe("Login:integration", () => {
  let app: Application;

  beforeEach(() => {
    app = buildApp().getExpress();
    app.listen();
  });

  afterEach(async () => {
    destroyContainer();
  });

  it("should return 200 and a success message when login is successful", async () => {
    const loginParams = {
      username: "Louisan",
      password: "abcdefg",
    };

    // await container.resolve(RegisterUseCase).handle(loginParams);

    const response = await request(app).post("/auth/login").send(loginParams);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Login successful");
    expect(response.body).toHaveProperty("token");

    const cookies = response.headers["set-cookie"];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toMatch(/token=/); // Assumes the token is stored in a cookie named 'token'
  });

  it("should return 404 and a UserNotFoundError message when username is not found", async () => {
    const loginParams = {
      username: "nonexistentuser",
      password: "anyPassword",
    };

    const response = await request(app).post("/auth/login").send(loginParams);

    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("UserNotFoundError");
  });

  it("should return 401 and a BadPasswordError message when password is incorrect", async () => {
    const loginParams = {
      username: "Louisan",
      password: "wrongpassword",
    };

    const response = await request(app).post("/auth/login").send(loginParams);

    expect(response.status).toBe(401);
    expect(response.body.error).toEqual("BadPasswordError");
    expect(response.body.message).toEqual("Invalid password provided");
  });

  it("should return a validation error when required fields are missing", async () => {
    const loginParams = {
      username: "",
      password: "",
    };

    const response = await request(app).post("/auth/login").send(loginParams);

    expect(response.status).toBe(400);
    expect(response.body.error).toEqual("Validation Error");
  });
});
