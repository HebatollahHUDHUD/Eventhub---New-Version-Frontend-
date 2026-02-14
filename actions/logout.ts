"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  DEFAULT_LOGOUT_REDIRECT,
  SESSION_NAME,
  USER_SESSION,
} from "@/constant";

export const logoutAction = async () => {
  const cookieSession = await cookies();
  cookieSession.delete(SESSION_NAME);
  cookieSession.delete(USER_SESSION);
  redirect(DEFAULT_LOGOUT_REDIRECT);
};
