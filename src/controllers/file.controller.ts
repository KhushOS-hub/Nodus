import type { Request, Response } from "express";
import { ApiResponse } from "../utils/response.utils.js";
import { createFile, updateFile, deleteFile, getFile, getFiles } from "../services/file.service.js";
import { fileInfo, streamReadFile } from "../services/storage.service.js";
import { ApiError } from "../utils/error.utils.js";

export async function createFileController(
    req: Request,
    res: Response
) {
    try {
        const path = "./storage/test-upload.bin";

        const info = await fileInfo(path);

        if (!info) {
            return res.status(500).json(
                new ApiResponse(
                    500,
                    null,
                    "Uploaded file could not be found",
                    false
                )
            );
        }

        const fileData = {
            originalName: "source.bin",
            storedName: "test-upload.bin",
            mimeType: req.headers["content-type"] || "application/octet-stream",
            size: info.size,
            path,
            folderId: 1
        };

        const file = await createFile(fileData);

        return res.status(201).json(
            new ApiResponse(
                201,
                file,
                "File uploaded successfully",
                true
            )
        );

    } catch (error) {
        console.error("Create file error:", error);

        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Failed to create file",
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