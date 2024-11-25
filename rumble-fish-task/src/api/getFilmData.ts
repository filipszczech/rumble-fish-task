import { Recommendation } from "../types";

export const fetchRecommendations = async (): Promise<Recommendation[]> => {
    try {
        // GET /recommendations
        const response = await fetch('/mock.json');
        if (!response.ok) {
            throw new Error('Failed to fetch recommendations');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

export const updateRecommendationStatus = async (id: string, status: "accept" | "reject") => {
    try {
        // PUT /recommendations/id/status
        const response = await fetch(`/recommendations/${id}/${status}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to update recommendation status");
        }

        return response.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
};