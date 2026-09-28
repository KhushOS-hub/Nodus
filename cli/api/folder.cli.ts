// This file contains all the cli - backend for folder implementation

import { apiFetch } from "../lib/tiny.api"
import type { Folder,FolderResponse } from "../types/folder"

export async function getFolders(): Promise<Folder[]> {
    const response = await apiFetch("/api/folders")

    if (!response.ok){
        console.log("Failed to fetch folders, try again")
        return []
    } 

    const {data} =  await response.json() as FolderResponse
    return data
}