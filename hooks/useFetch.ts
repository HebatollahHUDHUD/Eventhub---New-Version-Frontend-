"use client";

import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import type { FetchRequestConfig, RequestData } from "@/lib/fetch";
import {
  deleteData,
  getData,
  patchData,
  postData,
  putData,
} from "@/lib/request";

type FetchData = {
  endpoint: string;
  config?: FetchRequestConfig;
  queryKey?: any[];
};

// GET
export const useGetData = <T, K = unknown>({
  endpoint,
  config,
  queryKey = [],
}: FetchData) => {
  const { isLoading, isSuccess, status, data, refetch, isFetching } = useQuery({
    queryKey: [...queryKey, endpoint],
    queryFn: () => getData<T, K>({ endpoint, config }),
    placeholderData: keepPreviousData,
  });
  return { isLoading, isSuccess, status, data, refetch, isFetching };
};

// POST
export const usePostData = <T, K = unknown>({
  endpoint,
  config,
}: FetchData) => {
  const { data, mutateAsync, mutate, status, isSuccess, isPending } =
    useMutation({
      mutationKey: [endpoint, config],
      mutationFn: (data: RequestData) =>
        postData<T, K>({
          endpoint,
          config: { body: data, ...config },
        }),
    });
  return { data, mutateAsync, mutate, status, isSuccess, isPending };
};

// PUT
export const usePutData = <T, K = unknown>({ endpoint, config }: FetchData) => {
  const { data, mutateAsync, mutate, status, isSuccess } = useMutation({
    mutationKey: [endpoint, config],
    mutationFn: (data: RequestData) =>
      putData<T, K>({ endpoint, config: { body: data, ...config } }),
  });
  return { data, mutateAsync, mutate, status, isSuccess };
};

// PATCH
export const usePatchData = <T, K = unknown>({
  endpoint,
  config,
}: FetchData) => {
  const { data, mutateAsync, mutate, status, isSuccess } = useMutation({
    mutationKey: [endpoint, config],
    mutationFn: (data: RequestData) =>
      patchData<T, K>({ endpoint, config: { body: data, ...config } }),
  });
  return { data, mutateAsync, mutate, status, isSuccess };
};

// DELETE
export const useDeleteData = <T, K = unknown>({
  endpoint,
  config,
}: FetchData) => {
  const { data, mutateAsync, mutate, status, isSuccess, isPending } = useMutation({
    mutationKey: [endpoint, config],
    mutationFn: (data: RequestData) =>
      deleteData<T, K>({ endpoint, config: { body: data, ...config } }),
  });
  return { data, mutateAsync, mutate, status, isSuccess, isPending };
};
