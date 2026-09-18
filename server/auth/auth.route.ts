import { Router } from "express"
import { authenticate, sendCode } from "./auth.controller.js"

const auth = Router()

auth.route("/code").get(sendCode)
auth.route("/auth").post(authenticate)

export default auth