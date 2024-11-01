import { FileUploadButton } from "../../components/button/file-upload-button";
import { FileTable } from "../../components/file/file-table/file-table";

export const Dashboard = () => {
  return (
    <>
      <FileUploadButton path={"files"} />
      <FileTable path={"files/me/all"} />
    </>
  );
};
