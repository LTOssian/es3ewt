import { useGetData } from "../../../hooks/use-data";
import { TFileWithShare } from "../../../../../core/file/file";
import { FileRow } from "../file-row/file-row";
interface FileTableProps {
  path: string;
}

export const FileTable = (props: FileTableProps) => {
  const { data, error, isLoading } = useGetData<TFileWithShare[]>(
    props.path,
    {},
  );

  if (!data && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading files</div>;
  }

  return (
    <div className="file-grid">
      <table className="file-item">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Size (bytes)</th>
            <th>Shared link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((file) => (
            <FileRow key={file.id} file={file} />
          ))}
        </tbody>
      </table>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
