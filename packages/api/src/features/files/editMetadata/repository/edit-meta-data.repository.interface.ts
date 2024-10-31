import { TFileResponse, TUpdateFile } from "../../../../../../core/file/file";
export interface IEditMetaDataRepository {
  update(input: TUpdateFile): Promise<TFileResponse>;
}
