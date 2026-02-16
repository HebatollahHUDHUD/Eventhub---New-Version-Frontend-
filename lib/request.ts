"use client";

import cookies from "js-cookie";

import { FetchInstance } from "@/lib/fetch";
import type { FetchRequestConfig } from "@/lib/fetch";

import { API_URL, COOKIE_NAME, DEF_LNG, SESSION_NAME } from "@/constant";

const getLangAndToken = () => {
  const lang = cookies.get(COOKIE_NAME) || DEF_LNG;
  const token = cookies.get(SESSION_NAME);
  return { lang, token };
};

const { lang, token } = getLangAndToken();

const apiInstance = new FetchInstance({
  baseURL: API_URL ,
  headers: {
    "Accept-Language": lang,
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    lang,
  },
});

export type FetchData = {
  endpoint: string;
  config?: FetchRequestConfig;
};

// GET
export const getData = async <T, K = unknown>({
  endpoint,
  config,
}: FetchData) => {
  const { lang, token } = getLangAndToken();
  const res = await apiInstance.request<T, K>(endpoint, {
    headers: {
      "Accept-Language": lang,
      lang,
      Authorization: `Bearer ${token}`,
      ...config?.headers,
    },
    ...config,
  });
  return res;
};

// POST
export const postData = async <T, K = unknown>({
  endpoint,
  config,
}: FetchData) => {
  const { lang, token } = getLangAndToken();
  const res = await apiInstance.request<T, K>(endpoint, {
    method: "POST",
    headers: {
      "Accept-Language": lang,
      lang,
      Authorization: `Bearer ${token}`,
      ...config?.headers,
    },
    ...config,
  });
  return res;
};

// PUT
export const putData = async <T, K = unknown>({
  endpoint,
  config,
}: FetchData) => {
  const { lang, token } = getLangAndToken();
  const res = await apiInstance.request<T, K>(endpoint, {
    method: "PUT",
    headers: {
      "Accept-Language": lang,
      lang,
      Authorization: `Bearer ${token}`,
      ...config?.headers,
    },
    ...config,
  });
  return res;
};

// PATCH
export const patchData = async <T, K = unknown>({
  endpoint,
  config,
}: FetchData) => {
  const { lang, token } = getLangAndToken();
  const res = await apiInstance.request<T, K>(endpoint, {
    method: "PATCH",
    headers: {
      "Accept-Language": lang,
      lang,
      Authorization: `Bearer ${token}`,
      ...config?.headers,
    },
    ...config,
  });
  return res;
};

// DELETE
export const deleteData = async <T, K = unknown>({
  endpoint,
  config,
}: FetchData) => {
  const { lang, token } = getLangAndToken();
  const res = await apiInstance.request<T, K>(endpoint, {
    method: "DELETE",
    headers: {
      "Accept-Language": lang,
      lang,
      Authorization: `Bearer ${token}`,
      ...config?.headers,
    },
    ...config,
  });
  return res;
};
