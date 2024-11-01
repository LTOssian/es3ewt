import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  authorizedGet,
  authorizedPost,
  authorizedPatch,
  authorizedDelete,
} from "../lib/authorized-fetch";

// Use a query to GET data
export function useGetData<T>(path: string, options?: any) {
  return useQuery<T>({
    queryKey: [path],
    queryFn: () => authorizedGet(path),
    ...options,
  });
}

// Use a mutation to POST data
export function usePostData<T = any>(
  path: string,
  queryKey: string,
  options?: any,
) {
  const queryClient = useQueryClient();
  return useMutation<T, Error, T>({
    mutationFn: (body: T) => authorizedPost(path, body).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
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
    ...options,
  });
}

// Use a mutation to DELETE data
export function useDeleteData(path: string, queryKey: string, options?: any) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authorizedDelete(path).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
    ...options,
  });
}
