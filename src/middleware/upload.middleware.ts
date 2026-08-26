import type { Request, Response, NextFunction } from "express"
import { streamWriteFile } from "../services/storage.service.js"
import { ApiError } from "../utils/error.utils.js"
import { ApiResponse } from "../utils/response.utils.js"

export const upload = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const writeStream = streamWriteFile(
        "./storage/test-upload.bin"
    );

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
