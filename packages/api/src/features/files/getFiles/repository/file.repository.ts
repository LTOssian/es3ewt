import { inject, injectable } from "tsyringe";
import { IFileRepository } from "./file.repository.interface";
import { Knex } from "knex";

@injectable()
export class FileRepository implements IFileRepository {
  constructor(@inject("Database") private readonly db: Knex) {}

  getAllFilesByUserId(userId: number): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
}
