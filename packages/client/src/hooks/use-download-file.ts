import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authorizedGet, basicPost } from "../lib/authorized-fetch";

export function useDownloadFile(path: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await basicPost(path);
      console.log(response);

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const reader = response.body!.getReader();
      const chunks = [];
      let receivedLength = 0;

      // Read the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        receivedLength += value.length;
      }

      const blob = new Blob(chunks);

      const contentDisposition = response.headers.get("Content-Disposition");
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : "downloaded-file.zip"; // Default filename

      return { blob, filename };
    },
    onSuccess: ({ blob, filename }) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.error("Download failed:", error);
    },
  });
}
