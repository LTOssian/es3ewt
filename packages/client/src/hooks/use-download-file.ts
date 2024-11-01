import { useMutation } from "@tanstack/react-query";
import { basicPost } from "../lib/authorized-fetch";

export function useDownloadFile(path: string) {
  return useMutation({
    mutationFn: async (filename: string) => {
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
