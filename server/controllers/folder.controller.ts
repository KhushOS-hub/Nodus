import type { Request, Response } from "express";
import { getFolder, getFolders } from "../services/folder.service.js";
import { ApiResponse } from "../utils/response.utils.js";
import { ApiError } from "../utils/error.utils.js";
import { createFolderService } from "../services/folderstorage.service.js";

export async function createFolderController(req: Request, res: Response) {
    try {
        //validate fields coming from cli
        const { name, parentId } = req.body
        if (!name || typeof name !== "string") throw new ApiError(400, "Please provide a folder name")

        if (
            parentId !== null &&
            parentId !== undefined &&
            (!Number.isInteger(parentId) || parentId < 1)
        ) {
            throw new ApiError(
                400,
                "Invalid parent folder ID"
            )
        }
        const folder = await createFolderService(name, parentId ?? null)
        return res.status(201).json(new ApiResponse(201, folder, "Folder creation success", true))

    } catch (error) {
        console.error("CREATE FOLDER ERROR:", error)

        if (error instanceof ApiError) {
            return res
                .status(error.statusCode)
                .json(
                    new ApiResponse(
                        error.statusCode,
                        null,
                        error.message,
                        false
                    )
                );
        }

        return res
            .status(500)
            .json(
                new ApiResponse(
                    500,
                    null,
                    "Failed to create folder",
                    false
                )
            )
    }
}

export async function getFoldersController(req: Request, res: Response) {
    const folders = await getFolders()
    res
        .status(201)
        .json(
            new ApiResponse(
                201,
                folders,
                "Get request ran successfully",
                true)
        )
}


export async function getFolderController(req: Request, res: Response) {

    const folderName = req.headers["x-foldername"] as string
    if (!folderName) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "Folder Name required to search the folder",
                false
            )
        )
    }
    const folder = await getFolder(folderName)
    if (!folder) throw new ApiError(404, "Folder does not exist")

    res
        .status(201)
        .json(
            new ApiResponse(
                201,
                folder,
                "Get request ran successfully",
                true)
        )
}
