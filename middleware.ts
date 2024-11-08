import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	if (pathname === "/") {
		if (token) {
			const homeUrl = new URL("/home", req.url);
			return NextResponse.redirect(homeUrl);
		} else {
			const loginUrl = new URL("/auth/login", req.url);
			return NextResponse.redirect(loginUrl);
		}
	}

	if (!token) {
		if (
			!pathname.includes("/auth/login") &&
			!pathname.includes("/auth/register")
		) {
			const loginUrl = new URL("/auth/login", req.url);
			return NextResponse.redirect(loginUrl);
		}
	} else {
		if (
			pathname.includes("/auth/login") ||
			pathname.includes("/auth/register")
		) {
			const homeUrl = new URL("/home", req.url);
			return NextResponse.redirect(homeUrl);
		}
	}

	return NextResponse.next();
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
		"/profile",
		"/profile/(.*)",
	],
};
