import NextAuth, {
	NextAuthOptions,
	Session,
	User as NextAuthUser,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { createApiError } from "@/lib/utils";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					console.log("authorize called with credentials:", credentials);

					if (!credentials?.email || !credentials?.password) {
						const error = createApiError(
							"Email and password are required.",
							400
						);
						console.error(error);
						throw error;
					}

					const user = await prisma.user.findUnique({
						where: { email: credentials.email },
					});

					console.log("User fetched from DB:", user);

					if (
						user &&
						(await bcrypt.compare(credentials.password, user.password))
					) {
						console.log("Password matched successfully.");
						return user;
					}

					const error = createApiError("Invalid email or password.", 401);
					console.error(error);
					throw error;
				} catch (error) {
					const errorMessage =
						error instanceof Error ? error.message : "Authorization failed";
					console.error("Error in authorize callback:", errorMessage);
					throw createApiError(errorMessage, 500);
				}
			},
		}),
	],
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	cookies: {
		sessionToken: {
			name: "next-auth.session-token",
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: process.env.NODE_ENV === "production",
			},
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
			console.log("JWT Callback:", { token, user });

			if (user) {
				console.log("User returned in JWT callback:", user);
				token.id = user.id;
			}

			console.log("JWT token after modification:", token);
			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			console.log("Session Callback:", { session, token });

			if (token?.id && session.user) {
				console.log("Setting session user ID:", token.id);
				session.user.id = (token as { id: string }).id;
			}

			console.log("Session after modification:", session);
			return session;
		},
		async redirect({ url, baseUrl }) {
			console.log("Redirect callback:", { url, baseUrl });
			return url.startsWith(baseUrl) ? url : `${baseUrl}/home`;
		},
	},
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
	},
	debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
