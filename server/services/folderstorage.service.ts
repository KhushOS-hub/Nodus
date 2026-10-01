//This file is responsibe for physical folder creation

import path from "node:path";
import { mkdir, rm } from "node:fs/promises"
import { createFolder, getFolderById } from "./folder.service.js"
import { ApiError } from "../utils/error.utils.js";


const STORAGE_ROOT = path.resolve(
    process.env.HOME!,
    "storage/shared/Nodus"
)

await mkdir(STORAGE_ROOT, { recursive: true })

async function resolveFolderPath(parentId: number | null) {

    const folders: string[] = []

    let currentId = parentId

    while (currentId !== null) {

        const result = await getFolderById(currentId)

        if (result.length === 0) {
            throw new ApiError(404, `Parent folder ${currentId} not found`)
        }

        const folder = result[0]

        if (!folder) throw new ApiError(404, `Folder ${currentId} not found`)

        folders.unshift(folder.name)

        currentId = folder.parentId
    }

    return path.join(STORAGE_ROOT, ...folders)
}

export function validateFolderName(name: string) {
    if (!name.trim()) {
        throw new ApiError(400, "Folder name cannot be empty")
    }

    if (name === "." || name === "..") {
        throw new ApiError(400, "Invalid folder name")
    }

    if (name.includes("/") || name.includes("\\")) {
        throw new ApiError(400, "Folder name cannot contain path separators")
    }

    return name.trim();
}

export async function createFolderService(name: string, parentId: number | null) {

    const safeName = validateFolderName(name)
    // Resolve physical path
    const parentPath = await resolveFolderPath(parentId)
    const folderPath = path.join(parentPath, safeName)

    // Create directory
    await mkdir(folderPath)
    try {
        return await createFolder(safeName, parentId)
    } catch (error) {
        await rm(folderPath, { recursive: true, force: true })
        throw error
    }

}

