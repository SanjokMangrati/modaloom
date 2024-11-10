import * as z from "zod";

export const loginFormSchema = z.object({
	email: z.string().email("Invalid email address").min(1, "Email is required"),

	password: z.string().min(3, "Password is required"),
});

export const registerFormSchema = z
	.object({
		email: z.string().email("Enter a valid email"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
			.regex(
				/[!@#$%^&*(),.?":{}|<>]/,
				"Password must contain at least one special character"
			),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords and Confirm Password must match",
		path: ["confirmPassword"],
	});
