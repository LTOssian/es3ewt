import { useState } from "react";
import { TFileWithShare } from "../../../../../core/file/file";
import { usePatchData } from "../../../hooks/use-data";
import { useDeleteData } from "../../../hooks/use-data";
import { usePostData } from "../../../hooks/use-data"; // Assurez-vous d'importer votre hook de POST

interface IFileCardProps {
  file: TFileWithShare;
}

export const FileCard = ({ file }: IFileCardProps) => {
  const [newName, setNewName] = useState(file.name);
  const { mutate: mutateName } = usePatchData<{ name: string }>(
    `/files/${file.id}`,
    "files/me/all",
  );
  const { mutate: deleteFile } = useDeleteData(
    `/files/${file.id}`,
    "files/me/all",
  );
  const { mutate: generateLink } = usePostData(
    `/links/${file.id}`,
    "files/me/all",
  );

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

      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>
      <button onClick={handleGenerateLink} className="generate-link-button">
        Generate Link
      </button>
    </div>
  );
};
