import { useState } from "react";
import { usePostData } from "../../hooks/use-data";

interface IFileUploadButtonProps {
  path: string;
}
export const FileUploadButton = ({ path }: IFileUploadButtonProps) => {
  const [file, setFile] = useState<File | null>(null);

  const {
    mutate: uploadFile,
    isError,
    error,
    isPending,
  } = usePostData<FormData>(path);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    uploadFile(formData, {
      onSuccess: () => {
        console.log("File uploaded successfully!");
      },
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isPending || !file}>
        {isPending ? "Uploading..." : "Upload File"}
      </button>
      {isError && <p>Error: {error?.message}</p>}
    </div>
  );
};
