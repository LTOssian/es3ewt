import { useState } from "react";
import {
  usePatchData,
  useDeleteData,
  usePostData,
} from "../../../hooks/use-data";
import { TFileWithShare } from "../../../../../core/file/file";
interface IFileRowProps {
  file: TFileWithShare;
}

export const FileRow = ({ file }: IFileRowProps) => {
  const [newName, setNewName] = useState(file.name);
  const { mutate: mutateName } = usePatchData<{ name: string }>(
    `/files/${file.id}`,
    "files/me/all",
  );
  const { mutate: deleteFile } = useDeleteData(
    `/files/${file.id}`,
    "files/me/all",
  );
  const { mutate: generateLink } = usePostData(`/links/${file.id}`, [
    "files/me/all",
  ]);
  const handleChangeName = (event: React.FormEvent) => {
    event.preventDefault();
    mutateName({ name: newName });
  };

  const handleDelete = () => {
    if (window.confirm("Tu veux vraiment supprimer ce fichier?")) {
      deleteFile();
    }
  };

  const handleGenerateLink = async () => {
    try {
      generateLink({});
      // alert(`Lien généré : ${response.link}`);
    } catch (error) {
      console.error("Erreur lors de la génération du lien :", error);
    }
  };

  return (
    <tr key={file.id}>
      <td>{file.name}</td>
      <td>{file.size}</td>
      <td>
        {file.share?.isShared ? (
          <p>
            Shared Link: <a href={file.share.link!}>{file.share.link}</a>
          </p>
        ) : (
          "Not shared"
        )}
      </td>
      <td>
        <form onSubmit={(e) => handleChangeName(e)}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New file name"
          />
          <button type="submit">Change Name</button>
        </form>
        <button onClick={() => handleDelete()} className="delete-button">
          Delete
        </button>
        <button
          onClick={() => handleGenerateLink()}
          className="generate-link-button"
        >
          Generate Link
        </button>
      </td>
    </tr>
  );
};
