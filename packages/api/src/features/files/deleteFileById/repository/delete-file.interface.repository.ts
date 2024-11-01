import { TDeleteFile } from "../../../../../../core/file/file";

export interface IDeleteFileRepository {
  delete(input: TDeleteFile): Promise<void>;
}
