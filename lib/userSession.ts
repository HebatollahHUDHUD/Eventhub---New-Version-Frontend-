import cookieClient from "js-cookie";

import { INFO_SESSION, USER_SESSION, UserType } from "@/constant";
import { InfoSchema } from "@/schemas/shared";

export function getUserSession() {
  const userSession = cookieClient.get(USER_SESSION) || "";

  if (!userSession) return null;

  try {
    return JSON.parse(userSession);
  } catch (error) {
    console.error("Invalid JSON:", error, userSession);
    // Return a fallback value or handle the error
  }
}

export function isStudentType() {
  const user = getUserSession();

  return user.user_type === UserType.STUDENT;
}

export function getUserType() {
  const user = getUserSession();

  return user.user_type as UserType;
}

export function addUserSession(userSession: string) {
  cookieClient.set(USER_SESSION, userSession);
}

export function getInfoSession(): InfoSchema | null {
  const infoSession = cookieClient.get(INFO_SESSION) || "";

  if (!infoSession) return null;

  try {
    return JSON.parse(infoSession);
  } catch (error) {
    console.error("Invalid JSON:", error, infoSession);
    // Return a fallback value or handle the error
    return null;
  }
}
