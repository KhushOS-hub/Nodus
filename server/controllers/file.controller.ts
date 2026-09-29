import type { Request, Response } from "express";
import { ApiResponse } from "../utils/response.utils.js";
import { updateFile, deleteFile, getFile, getFiles } from "../services/file.service.js";
import { streamReadFile } from "../services/filestorage.service.js";
import { ApiError } from "../utils/error.utils.js";
import { uploadFileService } from "../services/filestorage.service.js";

export async function uploadFileController(
    req: Request,
    res: Response
) {
    try {
        const originalName = req.headers["x-filename"];
        const folderId = Number(req.headers["x-folder-id"]);

        if (typeof originalName !== "string") {
            return res.status(400).json(
                new ApiResponse(
                    400,
                    null,
                    "Filename is required",
                    false
                )
            );
        }

        if (!Number.isInteger(folderId)) {
            return res.status(400).json(
                new ApiResponse(
                    400,
                    null,
                    "Valid folder ID is required",
                    false
                )
            );
        }

        const file = await uploadFileService({
            originalName,
            folderId,
            mimeType:
                req.headers["content-type"] ||
                "application/octet-stream",
            stream: req
        });

        return res.status(201).json(
            new ApiResponse(
                201,
                file,
                "File uploaded successfully",
                true
            )
        );

    } catch (error) {
        console.error("Upload file error:", error);

        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Failed to upload file",
                false
            )
        );
    }
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

export async function downloadFileController(req: Request, res: Response) {
    {
        try {
            const id = Number(req.params.id)

            if (Number.isNaN(id)) {
                throw new ApiError(400, "Invalid file ID")
            }

            const file = await getFile(id)

            if (!file) {
                throw new ApiError(404, "File doesn't exist")
            }

            const stream = streamReadFile(file.path)

            stream.on("error", (error) => {
                console.error("File stream error:", error)

                if (!res.headersSent) {
                    res.status(500).json(
                        new ApiResponse(
                            500,
                            null,
                            "Error reading file",
                            false
                        )
                    );
                } else {
                    res.destroy(error)
                }
            })

            res.setHeader("Content-Type", file.mimeType)

            res.setHeader(
                "Content-Disposition",
                `attachment; filename="${file.originalName}"`
            );

            stream.pipe(res)

        } catch (error) {

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
                    )
            }

            console.error("File download error:", error)

            return res
                .status(500)
                .json(
                    new ApiResponse(
                        500,
                        null,
                        "Internal server error",
                        false
                    )
                )
        }
    }
}