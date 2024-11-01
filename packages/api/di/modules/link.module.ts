import { container, Lifecycle } from "tsyringe";
import { ICreateFileLinkRepository } from "../../src/features/links/createFileLink/repository/create-file-link.interface.repository";
import { CreateFileLinkRepository } from "../../src/features/links/createFileLink/repository/create-file-link.repository";
import { ValidateLinkRepository } from "../../src/features/links/validateLink/repository/validate-link.repository";
import { IValidateLinkRepository } from "../../src/features/links/validateLink/repository/validate-link.interface.repository";
import { IDownloadFileFromLinkRepository } from "../../src/features/links/downloadFileFromLink/repository/dl-file-from-link.interface.repository";
import { DownloadFileFromLinkRepository } from "../../src/features/links/downloadFileFromLink/repository/dl-file-from-link.repository";

export class LinkContainerModule {
  public static initializeModule() {
    container.register<ICreateFileLinkRepository>(
      "CreateFileLinkRepository",
      { useClass: CreateFileLinkRepository },
      { lifecycle: Lifecycle.Singleton },
    );

    container.register<IValidateLinkRepository>(
      "ValidateLinkRepository",
      { useClass: ValidateLinkRepository },
      { lifecycle: Lifecycle.Singleton },
    );

    container.register<IDownloadFileFromLinkRepository>(
      "DownloadFileFromLinkRepository",
      { useClass: DownloadFileFromLinkRepository },
      { lifecycle: Lifecycle.Singleton },
    );
  }
}
