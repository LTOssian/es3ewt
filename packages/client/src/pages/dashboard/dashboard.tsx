import { FileUploadButton } from "../../components/button/file-upload-button";
import { FileTable } from "../../components/file/file-table/file-table";
import Welcome from "../../components/welcome/welcome";

export const Dashboard = () => {
  return (
    <>
      <Welcome />
      <FileUploadButton path={"files"} />
      <FileTable path={"files/me/all"} />
    </>
  );
};
