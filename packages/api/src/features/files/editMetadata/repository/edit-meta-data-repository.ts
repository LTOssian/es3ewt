import { inject, injectable } from "tsyringe";
import { IEditMetaDataRepository } from "./edit-meta-data.repository.interface";
import { Knex } from "knex";
import { TFileResponse, TUpdateFile } from "../../../../../../core/file/file";
import { Client } from "minio";

@injectable()
export default class EditMetadataRepository implements IEditMetaDataRepository {
  constructor(@inject("Database") private readonly _db: Knex) {}

  async update(input: TUpdateFile): Promise<TFileResponse> {
    const { id, name } = input;
    await this._db("file").where({ id }).update({ name });

    const updatedFile = await this._db("file").where({ id }).first();

    return updatedFile;
  }
}
