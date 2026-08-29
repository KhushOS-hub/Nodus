import { apiRequest } from "./client";

export async function getFolders() {
    const response =  await apiRequest("/api/folders")
    return response.data
}

export async function createFolder(name) {
    const response = await apiRequest("/api/folder", {
        method: "POST",
        body: JSON.stringify({ name }),
    });

    return response.data[0];
}