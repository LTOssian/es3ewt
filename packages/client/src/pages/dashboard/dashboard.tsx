import { FileUploadButton } from "../../components/button/file-upload-button";
import { FileGrid } from "../../components/file/file-grid/file-grid";

export const Dashboard = () => {
  return (
    <>
      <FileUploadButton path="files" />
      <FileGrid path={"files/me/all"} />
    </>
  );
};
