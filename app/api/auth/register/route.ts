import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createApiError } from "@/lib/utils";

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();

		if (!email || !password) {
			const error = createApiError("Email and password are required.", 400);
			return NextResponse.json(
				{ error: error.message },
				{ status: error.status }
			);
		}

		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			const error = createApiError("User with this email already exists.", 409);
			return NextResponse.json(
				{ error: error.message },
				{ status: error.status }
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});

		return NextResponse.json(
			{
				message: "User registered successfully",
				user: { id: newUser.id, email: newUser.email },
			},
			{ status: 201 }
		);
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unexpected error occurred";
		const apiError = createApiError(
			`Registration failed: ${errorMessage}`,
			500
		);

		return NextResponse.json(
			{ error: apiError.message },
			{ status: apiError.status }
		);
	}
}
