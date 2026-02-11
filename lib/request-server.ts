"use server";

import { cookies } from "next/headers";
import { revalidateTag, revalidatePath } from "next/cache";
import { API_URL } from "@/constant";
import { FetchInstance } from "@/lib/fetch";
import type { FetchRequestConfig } from "@/lib/fetch";
import { createHeaders } from "@/lib/createHeaders";

const apiInstance = new FetchInstance({
  baseURL: API_URL,
});

type FetchData = {
  endpoint: string;
  config?: FetchRequestConfig;
};

// GET
export const getData = async <T, K = unknown>({ endpoint, config }: FetchData) => {
  const cookieStore = await cookies();
  const headers = createHeaders(cookieStore);
  const res = await apiInstance.request<T, K>(endpoint, {
    ...config,
    headers: { ...headers, ...config?.headers },
  });
  return res;
};

// POST
export const postData = async <T, K = unknown>({ endpoint, config }: FetchData) => {
  const cookieStore = await cookies();
  const headers = createHeaders(cookieStore);
  const res = await apiInstance.request<T, K>(endpoint, {
    method: "POST",
    ...config,
    headers: { ...headers, ...config?.headers },
  });
  return res;
};

// PUT
export const putData = async <T, K = unknown>({ endpoint, config }: FetchData) => {
  const cookieStore = await cookies();
  const headers = createHeaders(cookieStore);
  const res = await apiInstance.request<T, K>(endpoint, {
    method: "PUT",
    ...config,
    headers: { ...headers, ...config?.headers },
  });
  return res;
};

// PATCH
export const patchData = async <T, K = unknown>({ endpoint, config }: FetchData) => {
  const cookieStore = await cookies();
  const headers = createHeaders(cookieStore);
  const res = await apiInstance.request<T, K>(endpoint, {
    method: "PATCH",
    ...config,
    headers: { ...headers, ...config?.headers },
  });
  return res;
};

// DELETE
export const deleteData = async <T, K = unknown>({ endpoint, config }: FetchData) => {
  const cookieStore = await cookies();
  const headers = createHeaders(cookieStore);
  const res = await apiInstance.request<T, K>(endpoint, {
    method: "DELETE",
    ...config,
    headers: { ...headers, ...config?.headers },
  });
  return res;
};

// Helper function to revalidate cache tags
export { revalidateTag, revalidatePath };
