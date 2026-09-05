import { getFolderController, getFoldersController, createFolderController } from "../controllers/folder.controller.js";
import { Router } from "express";

const router = Router()

router.route("/folder").post(createFolderController)
router.route("/folder").get(getFolderController)
router.route("/folders").get(getFoldersController)

export default router