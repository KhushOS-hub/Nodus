import {
    getFilesController,
    deleteFileController,
    createFileController,
    updateFileController,
    downloadFileController
} from "../controllers/file.controller.js";
import { Router } from "express";
import { upload } from "../middleware/upload.middleware.js";

const router = Router()

router.route("/file/upload").post(upload, createFileController)
router.route("/file/update/:id").put(updateFileController)
router.route("/files/delete/:id").delete(deleteFileController)
router.route("/files").get(getFilesController)

router.route("/file/:id/download").get(downloadFileController)

export default router