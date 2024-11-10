import { NextRequest, NextResponse } from "next/server";
import * as styles from "@dicebear/collection";
import prisma from "@/lib/prisma";
import { createApiError, generateAvatar } from "@/lib/utils";

export async function GET(request: NextRequest) {
	try {
		const userId = request.nextUrl.searchParams.get("userId");

		if (!userId)
			return NextResponse.json(createApiError("User ID not provided", 400));

		const avatars = await prisma.avatar.findMany({
			where: { userId },
		});

		if (!avatars || avatars.length === 0) {
			return NextResponse.json(createApiError("No avatars found", 404));
		}

		const avatarsWithSvg = await Promise.all(
			avatars.map(async (avatar) => {
				try {
					const avatarSvg = await generateAvatar({
						style: styles[avatar.style as keyof typeof styles],
						seed: avatar.seed,
						options:
							avatar.options && typeof avatar.options === "object"
								? avatar.options
								: {},
					});

					return { ...avatar, avatarSvg };
				} catch (error) {
					console.error(`Error generating avatar for ${avatar.id}:`, error);
					return { ...avatar, avatarSvg: null };
				}
			})
		);

		return NextResponse.json(avatarsWithSvg);
	} catch (error) {
		console.error("Error fetching avatars:", error);
		return NextResponse.json(
			createApiError("An error occurred while fetching avatars", 500)
		);
	}
}
