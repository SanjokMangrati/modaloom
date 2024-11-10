import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ClientTemplate from "./template";
import { fetchAvatarsByUserId } from "@/lib/api";
import { UserProvider } from "@/context/user.context";
import { AvatarProvider } from "@/context/avatar.context";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Modaloom",
  description: "Custom Avatar Builder",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  const isAuthRoute = pathname.startsWith("/auth/");

  if (isAuthRoute) {
    return (
      <html lang="en">
        <body className="bg-background antialiased">
          <main>
            <ClientTemplate>{children}</ClientTemplate>
          </main>
          <Toaster />
        </body>
      </html>
    );
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("User not authenticated");
  }

  const user = session.user;
  const avatars = await fetchAvatarsByUserId(user.id);

  return (
    <html lang="en">
      <body className="bg-background antialiased">
        <nav className="bg-white h-14">Navbar</nav>
        <main>
          <UserProvider initialUser={user}>
            <AvatarProvider initialAvatars={avatars}>
              <ClientTemplate>{children}</ClientTemplate>
            </AvatarProvider>
          </UserProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}