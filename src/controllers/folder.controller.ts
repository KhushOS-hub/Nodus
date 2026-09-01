import type { Request, Response } from "express";
import { createFolder, getFolder, getFolders } from "../services/folder.service.js";
import { ApiResponse } from "../utils/response.utils.js";
import { ApiError } from "../utils/error.utils.js";
import { createFolderService } from "../services/folderstorage.service.js";



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
