import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createAvatar } from "@dicebear/core";
import { AvatarCreation, AvatarOptions } from "@/types/avatar.types";

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

const uuidRegex =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (id: string) => uuidRegex.test(id);

export const generateSeed = (name: string) => {
	return `${name}-${Math.floor(Math.random() * 10000)}`;
};

const adjectives = [
	"Quick",
	"Brave",
	"Mighty",
	"Silent",
	"Radiant",
	"Swift",
	"Gentle",
	"Clever",
	"Fierce",
	"Bold",
	"Mysterious",
	"Bright",
	"Fearless",
	"Noble",
	"Curious",
	"Cunning",
	"Stealthy",
	"Majestic",
	"Stormy",
	"Eternal",
];

const nouns = [
	"Tiger",
	"Falcon",
	"Dragon",
	"Wolf",
	"Phoenix",
	"Lion",
	"Bear",
	"Eagle",
	"Shark",
	"Raven",
	"Hawk",
	"Lioness",
	"Wolf",
	"Panther",
	"Cheetah",
	"Puma",
	"Jaguar",
	"Cobra",
	"Leopard",
	"Coyote",
];

const getRandomElement = (arr: string[]) =>
	arr[Math.floor(Math.random() * arr.length)];

export const generateRandomName = (): string => {
	const adjective = getRandomElement(adjectives);
	const noun = getRandomElement(nouns);

	const randomNumber = Math.floor(Math.random() * 1000);
	return `${adjective}${noun}${randomNumber}`;
};

export const generateDefaultAvatarData = () => {
	const name = generateRandomName();
	const seed = generateSeed(name);

	const AVATAR_CREATION_DEFAULT_DATA: AvatarCreation = {
		name: name,
		style: "adventurer",
		seed: seed,
		options: {
			backgroundColor: ["transparent"],
			eyebrows: ["variant09"],
			eyes: ["variant01"],
			hair: ["short01"],
			hairColor: ["ac6511"],
			mouth: ["variant01"],
			skinColor: ["f2d3b1"],
		},
	};

	return AVATAR_CREATION_DEFAULT_DATA;
};
