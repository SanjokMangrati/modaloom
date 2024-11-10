import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createAvatar } from "@dicebear/core";
import { AvatarOptions } from "@/types/avatar.types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function createApiError(message: string, status: number): ApiError {
	return { message, status };
}

export async function generateAvatar({ style, seed, options }: AvatarOptions) {
	try {
		const avatar = createAvatar(style, {
			seed,
			...(options && typeof options === "object" ? options : {}),
		});
		return avatar.toString();
	} catch (error) {
		throw createApiError("Failed to generate avatar SVG", 500);
	}
}
