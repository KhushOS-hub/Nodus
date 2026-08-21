import type { Request, Response } from "express";
import { ApiResponse } from "../utils/response.utils.js";
import { createFile, updateFile, deleteFile, getFile, getFiles } from "../services/file.service.js";

export async function createFileController(req: Request, res: Response) {
    const file = await createFile(req.body)

    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                file,
                "File added successfully",
                true
            )
        )
}

export async function getFilesController(req: Request, res: Response) {
    const files = await getFiles()

    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                files,
                "All the files",
                true
            )
        )
}

export async function deleteFileController(req: Request, res: Response) {
    const id = Number(req.params.id)
    const deletedFile = await deleteFile(id)

    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                deletedFile,
                "File Deleted",
                true
            )
        )
}

export async function updateFileController(req: Request, res: Response) {

    interface updateVar {
        id: number
        originalName: string,
        size: number
    }
    const { id, originalName, size } = req.body as updateVar
    const deletedFile = await updateFile(id, originalName, size)

    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                deletedFile,
                "File Deleted",
                true
            )
        )
}