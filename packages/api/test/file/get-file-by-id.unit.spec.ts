import { Application } from "express";
import "reflect-metadata";
import {
  describe,
  it,
  beforeEach,
  afterEach,
  expect,
  vi,
  Mocked,
} from "vitest";
import { buildApp } from "../..";
import { destroyContainer } from "../../di/container";
import { container } from "tsyringe";
import { GetFileByIdUseCase } from "../../src/features/files/getFileById/get-file-by-id.use-case";
import { IGetFileByIdRepository } from "../../src/features/files/files.repository.interface";
import { Client } from "minio";

vi.mock("../../src/features/files/getFileById/get-file-by-id.repository");
vi.mock("minio");

describe("GetFileById:unit", () => {
  let app: Application;
  let getFileByIdRepositoryMock: Mocked<IGetFileByIdRepository>;
  let minioClientMock: Mocked<Client>;

  beforeEach(() => {
    app = buildApp().getExpress();

    // Mock repository and client with expected behavior
    getFileByIdRepositoryMock = {
      get: vi.fn().mockResolvedValue({
        id: "5363dd64-0614-4025-b643-164b597e54b7",
        user_id: "b620621c-0e6d-44de-8fe1-5a91e32aba64",
        path: "sample-path/file.txt",
        name: "file.txt",
      }),
    };

    minioClientMock = {
      statObject: vi
        .fn()
        .mockResolvedValue({ size: 1024, lastModified: new Date().toString() }), // Mock file size
    } as unknown as Mocked<Client>;

    // Register mocks in the DI container
    container.registerInstance("FileStorage", minioClientMock);
    container.registerInstance(
      "GetFileByIdRepository",
      getFileByIdRepositoryMock,
    );
  });

  afterEach(() => {
    destroyContainer();
    vi.clearAllMocks();
  });

  it("should return the correct file", async () => {
    const user_id = "b620621c-0e6d-44de-8fe1-5a91e32aba64";
    const fileId = "5363dd64-0614-4025-b643-164b597e54b7";

    const file = await container
      .resolve(GetFileByIdUseCase)
      .handle({ fileId, userId: user_id });

    expect(file).toBeDefined();
  });
});
