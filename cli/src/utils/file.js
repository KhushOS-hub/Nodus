import { stat } from "node:fs/promises"
import path from "node:path"
import { lookup } from "mime-types"

export async function validateFile(path) {
    try {
        const info = await stat(path)

        if (!info.isFile()) {
            throw new Error("Path is not a file")
        }

        return info;
    } catch {
        throw new Error(`File does not exist: ${path}`)
    }
}

export async function inspectFile(filePath) {
    const info = await stat(filePath);

    if (!info.isFile()) {
        throw new Error("The provided path is not a file")
    }

    const originalName = path.basename(filePath)

    const mimeType =
        lookup(originalName) || "application/octet-stream"

    return {
        originalName,
        size: info.size,
        mimeType,
    }
}