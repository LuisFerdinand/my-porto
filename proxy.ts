import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALE_COOKIE, isLocale, localeFromAcceptLanguage } from "@/lib/i18n/config";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session-token";

// Two jobs. /admin is guarded with the session cookie (an optimistic redirect: every admin page, action and
// route handler re-checks the session itself). Everything else is sent to /en or /id, using the visitor's
// saved choice first and the browser's Accept-Language second.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const authed = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
    if (pathname === "/admin/login") {
      return authed ? NextResponse.redirect(new URL("/admin", request.url)) : NextResponse.next();
    }
    return authed ? NextResponse.next() : NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const first = pathname.split("/")[1];
  if (isLocale(first)) {
    const response = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== first) {
      response.cookies.set(LOCALE_COOKIE, first, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    }
    return response;
  }

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved) ? saved : localeFromAcceptLanguage(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and any path with a file extension (images, favicon).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
