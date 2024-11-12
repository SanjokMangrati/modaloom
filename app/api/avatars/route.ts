import { NextRequest, NextResponse } from "next/server";
import * as styles from "@dicebear/collection";
import prisma from "@/lib/prisma";
import { createApiError, generateAvatar } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

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

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json(createApiError("User not authenticated.", 401));
	}

	try {
		const avatarData = await request.json();

		if (
			!avatarData.name ||
			!avatarData.style ||
			!avatarData.seed ||
			!avatarData.options
		) {
			return NextResponse.json(createApiError("Missing required fields", 400));
		}

		const newAvatar = await prisma.avatar.create({
			data: {
				user: { connect: { id: session.user.id } },
				name: avatarData.name,
				style: avatarData.style,
				seed: avatarData.seed,
				options: avatarData.options || {},
			},
		});

		return NextResponse.json({ avatar: newAvatar }, { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			createApiError("An error occurred while creating the avatar", 500)
		);
	}
}
