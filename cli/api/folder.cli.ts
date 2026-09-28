// This file contains all the cli - backend for folder implementation

import { apiFetch } from "../lib/tiny.api"
import type { Folder, FolderResponse } from "../types/folder"
import pc from "picocolors"

export async function getFolders(): Promise<Folder[]> {
    const response = await apiFetch("/api/folders")

    if (!response.ok) {
        console.log("Failed to fetch folders, try again")
        return []
    }

    const { data } = await response.json() as FolderResponse
    return data
}

export async function postFolder(name: string) {
    // fetch, get the name, post
    try {
        const response = await apiFetch("/api/folder", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name
            })
        })

        if (!response.ok) {
            return {
                success: false,
                message: pc.redBright(`Failed to create ${name} folder`),
            }
        }

        return {
            success: true,
            message: pc.greenBright('Folder successfully created')
        }
    } catch (error) {
        return {
            success: false,
            message: pc.red("Unable to execute the request, try again later"),
        }
    }
}