import { generateRandomName, generateSeed } from "@/lib/utils";
import { Style } from "@dicebear/core";

export type Avatar = {
	id: string;
	userId: string;
	name: string;
	style: string;
	seed: string;
	options: Record<string, any>;
	avatarSvg: string;
	createdAt: Date;
	updatedAt: Date;
};

export type AvatarOptions = {
	style: Style<any>;
	seed: string;
	options?: Record<string, any>;
};

export type AvatarCreation = {
	name: string;
	style: string;
	seed: string;
	options: Record<string, any>;
};

export type AvailableAvatarProperties = {
	properties: {
		backgroundColor: Array<string>;
		eyebrows: Array<string>;
		eyes: Array<string>;
		hair: Array<string>;
		hairColor: Array<string>;
		mouth: Array<string>;
		skinColor: Array<string>;
	};
};

export const AVAILABLE_AVATAR_PROPERTIES_DEFAULT_DATA = {
	properties: {
		backgroundColor: [],
		eyebrows: [],
		eyes: [],
		hair: [],
		hairColor: [],
		mouth: [],
		skinColor: [],
	},
};
