import cookieClient from "js-cookie";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { COOKIE_NAME, DEF_LNG, SESSION_NAME } from "@/constant";

export function createHeaders(
  cookieStore?: ReadonlyRequestCookies | undefined
) {
  let lang = DEF_LNG;
  let session = "";

  if (cookieStore) {
    lang = cookieStore.get(COOKIE_NAME)?.value || DEF_LNG;
    session = cookieStore.get(SESSION_NAME)?.value || "";
  } else {
    lang = cookieClient.get(COOKIE_NAME) || DEF_LNG;
    session = cookieClient.get(SESSION_NAME) || "";
  }

  return {
    "Accept-Language": lang,
    Accept: "application/json",
    lang,
    Authorization: session ? `Bearer ${session}` : "",
  };
}
