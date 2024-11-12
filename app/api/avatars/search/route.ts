import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createApiError, generateAvatar } from "@/lib/utils";
import * as styles from "@dicebear/collection";

export async function GET(request: NextRequest) {
  try {
    const name = request.nextUrl.searchParams.get("name");

    if (!name) {
      return NextResponse.json(
        createApiError("Name parameter is required", 400),
      );
    }

    const avatars = await prisma.avatar.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    if (avatars.length === 0) {
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
      }),
    );

    return NextResponse.json(avatarsWithSvg);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      createApiError("An error occurred while searching for avatars", 500),
    );
  }
}
