import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  authorizedGet,
  authorizedPost,
  authorizedPatch,
  authorizedDelete,
} from "../lib/authorized-fetch";

// Use a query to GET data
export function useGetData<T>(path: string, options?: any) {
  return useQuery<{ data: T; error: any }>({
    ...(options.disabledQueryKey
      ? {}
      : {
          queryKey: [path],
        }),
    queryFn: async () => {
      const res = await authorizedGet(path);
      if (res.error == "Invalid token") {
        window.location.href = "/auth/login";
      }
      return res;
    },
    retry: (_failureCount, error) => {
      if (error.message == "Invalid token") {
        window.location.href = "/auth/login";
      }
    },
    ...options,
  });
}

// Use a mutation to POST data
export function usePostData<T = any>(
  path: string,
  queryKeys: string[],
  options?: any,
) {
  const queryClient = useQueryClient();
  return useMutation<{ data: T; error: any }, Error, T>({
    mutationFn: (body: T) => authorizedPost(path, body, options),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys }),
    retry: (_failureCount, error) => {
      if (error.message == "Invalid token") {
        window.location.href = "/auth/login";
        return false;
      }
      return true;
    },
    ...options,
  });
}

// Use a mutation to PUT data
export function usePatchData<T>(path: string, queryKey: string, options?: any) {
  const queryClient = useQueryClient();
  return useMutation<T, Error, T>({
    mutationFn: (body: T) =>
      authorizedPatch(path, body).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
    retry: (_failureCount, error) => {
      if (error.message == "Invalid token") {
        window.location.href = "/auth/login";
      }
    },
    ...options,
  });
}

// Use a mutation to DELETE data
export function useDeleteData(path: string, queryKey: string, options?: any) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authorizedDelete(path).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
    retry: (_failureCount, error) => {
      if (error.message == "Invalid token") {
        window.location.href = "/auth/login";
      }
    },
    ...options,
  });
}
