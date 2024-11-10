export async function fetchUserDetails() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${process.env.NEXTAUTH_SECRET}`,
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch user details");
	}

	return res.json();
}

export async function fetchAvatarsByUserId(userId: string) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/avatars?userId=${userId}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${process.env.NEXTAUTH_SECRET}`,
			},
		}
	);

	if (!res.ok) {
		throw new Error("Failed to fetch avatars");
	}

	return res.json();
}

export const fetchAvatarsByName = async (name: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/avatars/search?name=${name}`
	);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.message || "Failed to fetch avatars");
	}

	const data = await res.json();
	return data;
};
