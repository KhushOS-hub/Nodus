//This file is responsibe for physical folder creation

import path from "node:path";
import { mkdir } from "node:fs/promises"
import { createFolder, getFolderById } from "./folder.service.js"

const STORAGE_ROOT = "./storage/homevault";

async function resolveFolderPath(parentId: number | null) {

    const folders: string[] = []

    let currentId = parentId

    while (currentId !== null) {

        const result = await getFolderById(currentId)

        if (result.length === 0) {
            throw new Error(`Parent folder ${currentId} not found`)
        }

        const folder = result[0]

        if(!folder) throw new Error(`Folder ${currentId} not found`)

        folders.unshift(folder.name)

        currentId = folder.parentId
    }

    return path.join(STORAGE_ROOT, ...folders)
}

export async function createFolderService(name: string, parentId: number | null) {

    // 3. Resolve physical path
    const parentPath = await resolveFolderPath(parentId)
    const folderPath = path.join(parentPath, name)

    // 4. Create directory
    await mkdir(folderPath, { recursive: true })
    // 5. Insert DB record
    const folder = await createFolder(name, parentId)

    // 6. Return folder
    return folder
}

