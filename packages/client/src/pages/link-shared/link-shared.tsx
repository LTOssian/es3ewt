import { useParams } from "react-router-dom";
import { useGetData, usePostData } from "../../hooks/use-data"; // Assuming these hooks are set up
import { TFileWithShare } from "../../../../core/file/file";

export const LinkShared = () => {
  const { linkId } = useParams<{ linkId: string }>(); // Extract linkId from the route params

  // Fetch file info on render
  const {
    data: { data: fileInfo },
    isError,
    error,
    isLoading,
  } = useGetData<TFileWithShare>(`links/shared/${linkId}`);

  // Download file hook
  const { mutate: downloadFile, isPending } = usePostData(
    `links/shared/${linkId}`,
    [],
  );

  // Trigger download when the button is clicked
  const handleDownload = () => {
    downloadFile(null, {
      onSuccess: (data: any) => {
        // Create a Blob from the data received and download
        const blob = new Blob([data], { type: data.type });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileInfo?.name || "downloaded-file";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      onError: (error) => {
        console.error("Download failed:", error);
      },
    });
  };

  if (isLoading) return <p>Loading file info...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>File Info</h1>
      {fileInfo ? (
        <div>
          <p>
            <strong>Name:</strong> {fileInfo.name}
          </p>
          <p>
            <strong>Size:</strong> {fileInfo.size} bytes
          </p>
          <button onClick={handleDownload} disabled={isPending}>
            {isPending ? "Downloading..." : "Download File"}
          </button>
        </div>
      ) : (
        <p>No file information found.</p>
      )}
    </div>
  );
};
