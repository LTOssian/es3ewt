import { TFileWithShare } from "../../../../../core/file/file";

interface IFileCardProps {
  file: TFileWithShare;
}

export const FileCard = ({ file }: IFileCardProps) => {
  return (
    <div key={file.id} className="file-item">
      <h3>{file.name}</h3>
      <p>Size: {file.size} bytes</p>
      <p>Path: {file.path}</p>
      {file.share?.isShared && (
        <p>
          Shared Link: <a href={file.share.link!}>{file.share.link}</a>
        </p>
      )}
    </div>
  );
};
