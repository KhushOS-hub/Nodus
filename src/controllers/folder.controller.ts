import type { Request, Response } from "express";
import { createFolder, getFolders } from "../services/folder.service.js";
import { ApiResponse } from "../utils/response.utils.js";

export async function createFolderController(req: Request, res: Response) {
    const folder = await createFolder(req.body.name)

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                folder,
                "folder added successfully",
                true)
        )
}

export async function getFolderController(req: Request, res: Response) {
    const folder = await getFolders()
    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                folder,
                "Get request ran successfully",
                true)
        )
}
