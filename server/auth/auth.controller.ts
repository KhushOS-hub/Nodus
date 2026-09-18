import { ApiError } from "../utils/error.utils.js"
import { eq } from "drizzle-orm"
import type { Request, Response } from "express"
import { pairingCode, generateToken,hashToken } from "./auth.js"
import { authTable } from "../db/schema.js"
import { db } from "../index.js"

//Controller for sending Code
export async function sendCode(req: Request, res: Response) {
    const code = await pairingCode()
    res.status(201).json({code:code})
}

//Controller for final auth
export async function authenticate(req: Request, res: Response) {
    const {code} = req.body 

    if (!code) {
        throw new ApiError(400, "Pairing code is required")
    }

    const result = await db
        .select()
        .from(authTable)
        .where(eq(authTable.code, code))

    const authRecord = result[0]

    if (!authRecord) {
        throw new ApiError(401, "Invalid pairing code")
    }

    if (new Date() > authRecord.expiresAt) {
        throw new ApiError(401, "Pairing code has expired")
    }

    const token = await generateToken()
    const hashedToken = await hashToken(token)

    await db
        .update(authTable)
        .set({ tokenHash: hashedToken })
        .where(eq(authTable.code, code))

    return res.status(200).json({
        message: "Pairing successful",
        token
    })
}