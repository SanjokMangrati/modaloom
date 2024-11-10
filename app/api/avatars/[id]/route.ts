import { NextRequest, NextResponse } from "next/server";
import { createAvatar, Style } from "@dicebear/core";
import * as styles from "@dicebear/collection";
import prisma from "@/lib/prisma";
import { createApiError } from "@/lib/utils";

interface AvatarConfig {
	style: Style<any>;
	seed: string;
	options?: Record<string, any>;
}

async function generateAvatar({ style, seed, options }: AvatarConfig) {
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

export async function GET(request: NextRequest) {
	try {
		const id = request.nextUrl.searchParams.get("userId");

		if (!id)
			return NextResponse.json(createApiError("Avatar ID not provided", 400));

		const avatar = await prisma.avatar.findUnique({
			where: { id },
		});

		if (!avatar) {
			return NextResponse.json(createApiError("Avatar not found", 404));
		}

		const avatarSvg = await generateAvatar({
			style: styles[avatar.style as keyof typeof styles],
			seed: avatar.seed,
			options:
				avatar.options && typeof avatar.options === "object"
					? avatar.options
					: {},
		});

		return NextResponse.json({ avatarSvg, ...avatar });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			createApiError("An error occurred while fetching the avatar", 500)
		);
	}
}
