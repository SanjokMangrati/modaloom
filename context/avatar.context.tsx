'use client';
import { createContext, useState, useCallback, useContext, useMemo, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { Avatar } from "@/types/avatar.types";

interface AvatarContextType {
	avatars: Avatar[];
	setAvatars: (avatars: Avatar[]) => void;
	loading: boolean;
	error: string | null;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	fetchAvatarsByUserId: (userId: string) => Promise<void>;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider = ({ children, initialAvatars }: { children: ReactNode, initialAvatars: Avatar[] }) => {
	const [avatars, setAvatars] = useState<Avatar[]>(initialAvatars);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { toast } = useToast();

	const fetchAvatarsByUserId = useCallback(async (userId: string) => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/avatars?userId=${userId}`);
			if (!response.ok) throw new Error("Failed to fetch avatars");
			const data = await response.json();
			setAvatars(data);
		} catch (error: any) {
			const errorMessage = error instanceof Error ? error.message : "An error occurred";
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

	const value = useMemo(() => ({
		avatars,
		setAvatars,
		loading,
		error,
		setLoading,
		setError,
		fetchAvatarsByUserId,
	}), [avatars, loading, error, fetchAvatarsByUserId]);

	return (
		<AvatarContext.Provider value={value}>{children}</AvatarContext.Provider>
	);
};

export const useAvatarContext = () => {
	const context = useContext(AvatarContext);
	if (!context) {
		throw new Error("useAvatarContext must be used within AvatarProvider");
	}
	return context;
};
