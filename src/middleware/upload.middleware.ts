import type { Request, Response, NextFunction } from "express"
import { streamWriteFile } from "../services/filestorage.service.js"
import { ApiResponse } from "../utils/response.utils.js"

export const upload = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const storedName = req.headers["x-stored-name"];

    if (!storedName || typeof storedName !== "string") {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "X-Stored-Name header is required",
                false
            )
        );
    }
    const path = `./storage/${storedName}`
    const writeStream = streamWriteFile(path)

    req.pipe(writeStream);

    writeStream.on("finish", () => {
        console.log("Upload finished");
        next();
    });

    writeStream.on("error", (error) => {
        console.error("Upload failed:", error);

        if (!res.headersSent) {
            res.status(500).json(
                new ApiResponse(
                    500,
                    null,
                    error.message,
                    false
                )
            );
        }
    });
};
