import { useState } from "react";
import { TFileWithShare } from "../../../../../core/file/file";
import { usePutData } from "../../../hooks/use-data";

interface IFileCardProps {
  file: TFileWithShare;
}

export const FileCard = ({ file }: IFileCardProps) => {
  const [newName, setNewName] = useState(file.name);
  const { mutate } = usePutData<{ name: string }>(`/files/${file.id}`);

  const handleChangeName = (event: React.FormEvent) => {
    event.preventDefault();
    mutate({ name: newName });
  };

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

      <form onSubmit={handleChangeName}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New file name"
        />
        <button type="submit">Change Name</button>
      </form>
    </div>
  );
};
