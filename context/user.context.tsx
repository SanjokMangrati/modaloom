"use client";
import { useToast } from "@/hooks/use-toast";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

interface UserContextProps {
  user: User;
  loading: boolean;
  error: string | null;
  fetchUserDetails: () => void;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: User;
}) => {
  const [user, setUser] = useState<User>(initialUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchUserDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.NEXTAUTH_SECRET}`,
          },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch user details.");
      const data = await response.json();
      setUser(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      error,
      fetchUserDetails,
    }),
    [user, loading, error, fetchUserDetails],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
