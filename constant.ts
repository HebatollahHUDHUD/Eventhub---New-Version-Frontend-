const COOKIE_NAME = "NEXT_LOCALE";
const SESSION_NAME = "NEXT_SESSION";
const EMAIL_ADDRESS = "EMAIL_ADDRESS";
const PASSWORD_RESET = "PASSWORD_RESET";
const USER_SESSION = "USER_SESSION";
const INFO_SESSION = "INFO_SESSION";

const DEF_LNG = "ar";

type Locale = "ar";

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify-email",
  "/new-password",
];

const PUBLIC_ROUTES = [
  "/",
  "/about-us",
  "/contact-us",
  "/privacy-policy",
  "/terms-conditions",
  "/terms-use",
];

const DEFAULT_LOGIN_REDIRECT = "/dashboard";
const DEFAULT_LOGOUT_REDIRECT = "/login";
const BASE_URL = "https://eventshubs.com";
const API_URL = "https://apis-eventshubs.hudhud.it.com/api";

const PUSHER_APP_ID = "2060491";
const PUSHER_APP_KEY = "3bb1f97034c7d028906d";
const PUSHER_APP_CLUSTER = "mt1";

enum UserType {
  "COMPANY" = "company",
  "TALENT" = "talent",
  "RECRUITER" = "recruiter",
}

export {
  COOKIE_NAME,
  SESSION_NAME,
  EMAIL_ADDRESS,
  PASSWORD_RESET,
  AUTH_ROUTES,
  PUBLIC_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGOUT_REDIRECT,
  BASE_URL,
  API_URL,
  USER_SESSION,
  UserType,
  DEF_LNG,
  INFO_SESSION,
  PUSHER_APP_ID,
  PUSHER_APP_KEY,
  PUSHER_APP_CLUSTER,
};

export type { Locale };
