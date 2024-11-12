import { NextRequest, NextResponse } from "next/server";
import * as styles from "@dicebear/collection";
import prisma from "@/lib/prisma";
import { createApiError, generateAvatar } from "@/lib/utils";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = await params;

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
export async function PUT(request: NextRequest) {
	try {
		const { avatarConfig } = await request.json();

		const id = avatarConfig.id;

		if (!id)
			return NextResponse.json(createApiError("Avatar ID not provided", 400));

		if (!avatarConfig || !avatarConfig.options) {
			return NextResponse.json(createApiError("Invalid avatar data", 400));
		}

		await prisma.avatar.update({
			where: { id },
			data: {
				id: avatarConfig.id,
				userId: avatarConfig.userId,
				style: avatarConfig.style,
				seed: avatarConfig.seed,
				options: avatarConfig.options,
			},
		});

		return NextResponse.json({
			message: "Avatar updated successfully",
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			createApiError("An error occurred while updating the avatar", 500)
		);
	}
}
