import { useState } from "react";
import { usePostData } from "../../hooks/use-data";

interface IFileUploadButtonProps {
  path: string;
}

export const FileUploadButton = ({ path }: IFileUploadButtonProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    mutate: uploadFile,
    error,
    isPending,
  } = usePostData<FormData>(path, ["files/me/all"]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    uploadFile(formData, {
      onSuccess: ({ data, error }) => {
        if (error && typeof error === "object") {
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
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isPending || !file}>
        {isPending ? "Uploading..." : "Upload File"}
      </button>
      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
};
