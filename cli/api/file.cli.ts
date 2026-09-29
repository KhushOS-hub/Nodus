import fs from "node:fs"
import path from "node:path"
import { apiFetch } from "../lib/tiny.api"

export async function uploadFile(
    filePath: string,
    folderId: number | null
) {
    const absolutePath = path.resolve(filePath)

    const stat = await fs.promises.stat(absolutePath)

    if (!stat.isFile()) {
        throw new Error("The selected path is not a file")
    }

    const originalName = path.basename(absolutePath)

    const fileStream = fs.createReadStream(absolutePath)

    const headers: Record<string, string> = {
        "Content-Type": "application/octet-stream",
        "x-filename": originalName
    };

    if (folderId !== null) {
        headers["x-folder-id"] = String(folderId)
    }

    const response = await apiFetch(
        "/api/file/upload",
        {
            method: "POST",
            headers,
            body: fileStream
        }
    )

    const text = await response.text();

    let data: any

    try {
        data = JSON.parse(text);
    } catch {
        throw new Error(
            `Server returned invalid JSON (${response.status}): ${text}`
        )
    }

    if (!response.ok) {
        throw new Error(
            data.message || "File upload failed"
        )
    }

    return data;
}