import "reflect-metadata";
import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { buildApp } from "../..";
import request from "supertest";
import { destroyContainer } from "../../di/container";
import { Application } from "express";

describe("GetFileById:integration", () => {
  let app: Application;

  beforeEach(() => {
    app = buildApp().getExpress();
    app.listen();
  });

  afterEach(async () => {
    destroyContainer();
  });

  it("should return 200 and the file", () => {});
});
