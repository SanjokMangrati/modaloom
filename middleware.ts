import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/route";

const AUTH_ROUTES = ["/auth/login", "/auth/register"];
const PROTECTED_ROUTES = ["/home", "/avatar"];
const PUBLIC_ROUTES = ["/api/", "/auth/error"];

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	if (PUBLIC_ROUTES.some((route) => pathname.includes(route))) {
		return NextResponse.next();
	}

	const token = await getToken({
		req,
		secret: process.env.NEXTAUTH_SECRET,
		cookieName: "next-auth.session-token",
	});


	if (pathname === "/") {
		return NextResponse.redirect(
			new URL(token ? "/home" : "/auth/login", req.url)
		);
	}

	const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
	const isProtectedRoute = PROTECTED_ROUTES.some((route) => {
		return pathname.startsWith(route) || pathname.includes(`${route}/`);
	});

	if (isProtectedRoute && !token) {
		return NextResponse.redirect(new URL("/auth/login", req.url));
	}

	if (isAuthRoute && token) {
		return NextResponse.redirect(new URL("/home", req.url));
	}

	const requestHeaders = new Headers(req.headers);
	requestHeaders.set("x-pathname", pathname);

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}

export const config = {
	matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
