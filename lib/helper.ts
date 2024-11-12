export const unprotectedRoutes = ["/auth/login", "/auth/register"];

export async function handleFetchResponse(response: Response) {
	if (!response.ok) {
		const errorData = await response.json();
		const errorMessage = errorData.message || "An error occurred";
		throw new Error(errorMessage);
	}
	return response.json();
}
