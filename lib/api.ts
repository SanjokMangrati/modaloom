import { Avatar } from "@prisma/client";
import { isUuid } from "./utils";
import { AvatarCreation } from "@/types/avatar.types";
import { handleFetchResponse } from "./helper";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_HEADER = {
	Authorization: `Bearer ${process.env.NEXTAUTH_SECRET}`,
};

export async function fetchUserDetails() {
	const response = await fetch(`${API_URL}/api/user`, {
		method: "GET",
		headers: AUTH_HEADER,
	});
	return handleFetchResponse(response);
}

export async function fetchAvatarsByUserId(userId: string) {
	const response = await fetch(`${API_URL}/api/avatars?userId=${userId}`, {
		method: "GET",
		headers: AUTH_HEADER,
	});
	return handleFetchResponse(response);
}

export const fetchAvatarsByName = async (name: string) => {
	const response = await fetch(`${API_URL}/api/avatars/search?name=${name}`);
	return handleFetchResponse(response);
};

export const fetchAvatarById = async (avatarId: string) => {
	if (!avatarId || !isUuid(avatarId)) {
		throw new Error("Id not provided or invalid id format");
	}
	const response = await fetch(`${API_URL}/api/avatars/${avatarId}`);
	return handleFetchResponse(response);
};

export const createAvatar = async (avatarData: AvatarCreation) => {
	const response = await fetch("/api/avatars", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(avatarData),
	});
	return handleFetchResponse(response).then((data) => data.avatar);
};

export const updateAvatar = async (avatarConfig: Avatar) => {
	if (!avatarConfig.id || !isUuid(avatarConfig.id)) {
		throw new Error("Id not provided or invalid id format");
	}
	const response = await fetch(`${API_URL}/api/avatars/${avatarConfig.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ avatarConfig }),
	});
	return handleFetchResponse(response);
};
