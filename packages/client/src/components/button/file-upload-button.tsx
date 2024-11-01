import { useState } from "react";
import { usePostData } from "../../hooks/use-data";

interface IFileUploadButtonProps {
  path: string;
}

export const FileUploadButton = ({ path }: IFileUploadButtonProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: uploadFile, isPending } = usePostData<any>(
    path,
    ["files/me/all"],
    {
      headers: {},
    },
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    console.log(e);
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    file;

    uploadFile(formData, {
      onSuccess: ({ data, error }) => {
        console.log(data, error);
        if (error) {
          setErrorMessage(error || "An unknown error occurred.");
        } else {
          setErrorMessage("An unknown error occurred.");
        }
        if (data) {
          setErrorMessage(null);
          console.log(data);
        }
      },
    });
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" name="file" onChange={handleFileChange} />
      <button type="submit" disabled={isPending || !file}>
        {isPending ? "Uploading..." : "Téléverser un fichier"}
      </button>
      {errorMessage && <p>Error: {errorMessage}</p>}
    </form>
  );
};
