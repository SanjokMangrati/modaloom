"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

export default function ClientTemplate({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
