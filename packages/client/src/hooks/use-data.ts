import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  authorizedGet,
  authorizedPost,
  authorizedPut,
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
export function usePostData<T>(path: string, options?: any) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: T) => authorizedPost(path, body).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [path] }),
    ...options,
  });
}

// Use a mutation to PUT data
export function usePutData<T>(path: string, options?: any) {
  const queryClient = useQueryClient();
  return useMutation<T, Error, T>({
    mutationFn: (body: T) => authorizedPut(path, body).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [path] }),
    ...options,
  });
}

// Use a mutation to DELETE data
export function useDeleteData(path: string, options?: any) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authorizedDelete(path).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [path] }),
    ...options,
  });
}
