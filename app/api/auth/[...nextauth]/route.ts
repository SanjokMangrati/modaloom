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

const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					if (!credentials?.email || !credentials?.password) {
						throw new Error("Email and password are required.");
					}

					const user = await prisma.user.findUnique({
						where: { email: credentials.email },
					});

					if (
						user &&
						(await bcrypt.compare(credentials.password, user.password))
					) {
						return user;
					}

					throw new Error("Invalid email or password.");
				} catch (error) {
					throw new Error(`Authorization failed. | ${error}`);
				}
			},
		}),
	],
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			if (token?.id && session.user) {
				session.user.id = (token as { id: string }).id;
			}
			return session;
		},
	},
	pages: {
		signIn: "/auth/login",
	},
	debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
