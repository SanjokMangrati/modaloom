import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { createApiError } from "@/lib/utils";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session || !session.user || !session.user.id) {
			return NextResponse.json(createApiError("User not authenticated", 401));
		}

		const user = await prisma.user.findUnique({
			where: { id: session.user.id },
			select: {
				id: true,
				email: true,
				createdAt: true,
			},
		});

		if (!user) {
			return NextResponse.json(createApiError("User not found", 404));
		}

		return NextResponse.json(user);
	} catch (error) {
		console.error("Error fetching user details:", error);
		return NextResponse.json(
			createApiError("Failed to fetch user details", 500)
		);
	}
}
