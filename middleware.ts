import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const AUTH_ROUTES = ["/auth/login", "/auth/register"];
const PROTECTED_ROUTES = ["/home", "/avatar"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/auth/error") {
    return NextResponse.next();
  }

  if (
    pathname.includes("/api/auth/session") ||
    pathname.includes("/api/user")
  ) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (pathname === "/") {
    const redirectUrl = token ? "/home" : "/auth/login";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname.startsWith(route) || pathname.includes(`${route}/`),
  );

  if (!token) {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  } else {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/auth/register",
    "/home",
    "/home/(.*)",
    "/avatar",
    "/avatar/(.*)",
  ],
};
