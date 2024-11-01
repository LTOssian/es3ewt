import { useGetData } from "../../../hooks/use-data";
import { TFileWithShare } from "../../../../../core/file/file";
import { FileCard } from "../file-card/file-card";
interface FileGridProps {
  path: string;
}

export const FileGrid = (props: FileGridProps) => {
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
      {data.data.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
      {error}
    </div>
  );
};
