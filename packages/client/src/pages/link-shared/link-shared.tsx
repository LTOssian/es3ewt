import { useParams } from "react-router-dom";
import { useGetData, usePostData } from "../../hooks/use-data"; // Assuming these hooks are set up

export const LinkShared = () => {
  const { linkId } = useParams<{ linkId: string }>();
  const { data, isError, error, isLoading } = useGetData<{
    name: string;
    size: number;
    sharedBy: string;
  }>(`links/shared/${linkId}`, { disabledQueryKey: true });

  // Download file hook
  const { mutate: downloadFile, isPending } = usePostData(
    `links/shared/${linkId}`,
    [],
  );

  const handleDownload = (e: any) => {
    e.preventDefault();
    downloadFile(
      {},
      {
        onSuccess: (data: any) => {
          console.log(data);
          // const blob = new Blob([data], { type: data.type });
          // const link = document.createElement("a");
          // link.href = URL.createObjectURL(blob);
          // link.download = data.name || "downloaded-file";
          // document.body.appendChild(link);
          // link.click();
          // document.body.removeChild(link);
        },
        onError: (error) => {
          console.error("Download failed:", error);
        },
      },
    );
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

          <button onClick={handleDownload} disabled={isPending}>
            {isPending ? "Downloading..." : "Download File"}
          </button>
        </div>
      ) : (
        <p>No file information found.</p>
      )}
      {data.error && <p>{data.error}</p>}
    </div>
  );
};
