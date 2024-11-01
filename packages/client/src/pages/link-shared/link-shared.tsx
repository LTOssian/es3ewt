import { useParams } from "react-router-dom";
import { useGetData } from "../../hooks/use-data"; // Assuming these hooks are set up
import { useDownloadFile } from "../../hooks/use-download-file";

export const LinkShared = () => {
  const { linkId } = useParams<{ linkId: string }>();
  const { data, isError, error, isLoading } = useGetData<{
    name: string;
    size: number;
    sharedBy: string;
  }>(`links/shared/${linkId}`, { disabledQueryKey: true });

  // Download file hook
  const downloadFile = useDownloadFile(`links/shared/${linkId}`);

  const handleDownload = async (e: any) => {
    e.preventDefault();
    await downloadFile.mutateAsync();
  };

  if (isLoading) return <p>Loading file info...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>File Info</h1>
      {data.data ? (
        <div>
          <p>
            <strong>Name:</strong> {data.data.name}
          </p>
          <p>
            <strong>Size:</strong> {data.data.size} bytes
          </p>
          <p>
            <strong>Shared by:</strong> {data.data.sharedBy}
          </p>

          <button onClick={handleDownload} disabled={downloadFile.isPending}>
            {downloadFile.isPending ? "Downloading..." : "Download File"}
          </button>
        </div>
      ) : (
        <p>No file information found.</p>
      )}
      {data.error && <p>{data.error}</p>}
    </div>
  );
};
