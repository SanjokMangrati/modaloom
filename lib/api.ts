import { Avatar } from "@prisma/client";
import { isUuid } from "./utils";
import { AvatarCreation } from "@/types/avatar.types";

export async function fetchUserDetails() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${process.env.NEXTAUTH_SECRET}`,
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch user details");
	}

	return res.json();
}

export async function fetchAvatarsByUserId(userId: string) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/avatars?userId=${userId}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${process.env.NEXTAUTH_SECRET}`,
			},
		}
	);

	if (!res.ok) {
		throw new Error("Failed to fetch avatars");
	}

	return res.json();
}

export const fetchAvatarsByName = async (name: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/avatars/search?name=${name}`
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "Failed to fetch avatars");
	}

	const data = await res.json();
	return data;
};

export const fetchAvatarById = async (avatarId: string) => {
	if (!avatarId || !isUuid(avatarId)) {
		throw new Error("Id not provided or invalid id format");
	}

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/avatars/${avatarId}`
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "Failed to fetch avatar by Id");
	}

	const data = await res.json();
	return data;
};

export const createAvatar = async (avatarData: AvatarCreation) => {
	try {
		const response = await fetch("/api/avatars", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(avatarData),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to create avatar");
		}

		const data = await response.json();
		return data.avatar;
	} catch (error) {
		console.error("Error creating avatar:", error);
		throw error;
	}
};

export const updateAvatar = async (avatarConfig: Avatar) => {
	try {
		if (!avatarConfig.id || !isUuid(avatarConfig.id)) {
			throw new Error("Id not provided or invalid id format");
		}

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/avatars/${avatarConfig.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					avatarConfig,
				}),
			}
		);

		if (!res.ok) {
			throw new Error("Failed to update avatar");
		}

		const data = await res.json();
		return data;
	} catch (error) {
		throw error;
	}
};
