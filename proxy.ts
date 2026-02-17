import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";
import { COOKIE_NAME } from "@/constant";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Run the next-intl middleware first
  const response = intlMiddleware(request);

  // Extract locale from the URL path
  const pathname = request.nextUrl.pathname;
  const localeMatch = pathname.match(/^\/(ar|en)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;

  // Get current locale from cookie
  const currentLocale = request.cookies.get(COOKIE_NAME)?.value;

  // Save locale to COOKIE_NAME cookie if it has changed
  if (currentLocale !== locale) {
    response.cookies.set(COOKIE_NAME, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
