const API_URL = "http://localhost:8000";

export async function createServer(serverData) {
    const response = await fetch(`${API_URL}/servers/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(serverData)
    });

    if (!response.ok) {
        throw new Error("Failed to create server");
    }

    return await response.json();
}

export async function getServers() {
    const response = await fetch(`${API_URL}/servers/`);

    if (!response.ok) {
        throw new Error("Failed to fetch servers");
    }

    return await response.json();
}