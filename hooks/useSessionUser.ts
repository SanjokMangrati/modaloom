import { useSession } from "next-auth/react";

export const useSessionUser = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  return userId;
};
