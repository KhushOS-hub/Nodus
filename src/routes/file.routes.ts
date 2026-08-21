import { getFilesController, deleteFileController, createFileController, updateFileController } from "../controllers/file.controller.js";
import { Router } from "express";

const router = Router()

router.route("/file").post(createFileController)
router.route("/file/update/:id").put(updateFileController)
router.route("/files/delete/:id").delete(deleteFileController)
router.route("/files").get(getFilesController)

export default router