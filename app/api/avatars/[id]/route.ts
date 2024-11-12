import { NextRequest, NextResponse } from "next/server";
import * as styles from "@dicebear/collection";
import prisma from "@/lib/prisma";
import { createApiError, generateAvatar } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
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
      createApiError("An error occurred while fetching the avatar", 500),
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
      createApiError("An error occurred while updating the avatar", 500),
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
      const error = createApiError(
        "You must be logged in to delete an avatar",
        401,
      );
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    const avatar = await prisma.avatar.findUnique({
      where: { id },
    });

    if (!avatar) {
      const error = createApiError("Avatar not found", 404);
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    if (avatar.userId !== session.user.id) {
      const error = createApiError(
        "You are not authorized to delete this avatar",
        403,
      );
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    await prisma.avatar.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Avatar deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    const apiError = createApiError(`Deletion failed: ${errorMessage}`, 500);

    return NextResponse.json(
      { error: apiError.message },
      { status: apiError.status },
    );
  }
}
