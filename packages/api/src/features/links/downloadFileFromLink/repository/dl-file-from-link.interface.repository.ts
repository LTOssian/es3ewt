import { Response } from "express";

export interface IDownloadFileFromLinkRepository {
  download(credentials: { linkId: string; response: Response }): Promise<void>;
  getInformations(credentials: { linkId: string }): Promise<any>;
}
