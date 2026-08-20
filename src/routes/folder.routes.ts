import { getFolderController, createFolderController } from "../controllers/folder.controller.js";
import { Router } from "express";

const router = Router()

router.route("/folder").post(createFolderController)
router.route("/folder").get(getFolderController)

export default router