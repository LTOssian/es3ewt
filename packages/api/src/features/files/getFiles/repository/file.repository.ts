import { inject, injectable } from "tsyringe";
import { IGetAllFilesByUserIdRepository } from "./file.repository.interface";
import { Knex } from "knex";
import {
  TFileResponse,
  TFileWithShare,
  TGetFileByUserIdRequest,
} from "../../../../../../core/file/file";

@injectable()
export class GetAllFilesByUserIdRepository
  implements IGetAllFilesByUserIdRepository
{
  constructor(@inject("Database") private readonly db: Knex) {}
  async getAllFilesByUserId(
    credentials: TGetFileByUserIdRequest,
  ): Promise<TFileWithShare[]> {
    const files = await this.db("file")
      .leftJoin("link", "file.id", "link.file_id")
      .where("file.user_id", credentials.userId)
      .select(
        "file.*",
        this.db.raw(
          "CASE WHEN link.id IS NOT NULL THEN true ELSE false END AS is_shared",
        ),
        this.db.raw(
          "COALESCE(CONCAT('links/shared/', link.id), NULL) AS link_path",
        ),
      );

    return files.map(
      (file: TFileResponse & { is_shared: boolean; link_path: string }) => ({
        id: file.id,
        user_id: file.user_id,
        name: file.name,
        path: file.path,
        size: file.size,
        lastUpdate: file.lastUpdate,
        share: {
          isShared: Boolean(file.is_shared),
          link: file.link_path || null,
        },
      }),
    );
  }
}
