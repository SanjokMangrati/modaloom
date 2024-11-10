import { Style } from "@dicebear/core";

export type Avatar = {
	id: string;
	userId: string;
	name: string;
	style: string;
	seed: string;
	options: Record<string, any>;
	avatarSvg: string;
	createdAt: string;
	updatedAt: string;
};

export type AvatarOptions = {
	style: Style<any>;
	seed: string;
	options?: Record<string, any>;
};
