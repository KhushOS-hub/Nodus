import { authTable } from "../db/schema.js"
import { db } from "../index.js"
import { lt } from "drizzle-orm"

export async function deletePairingCodes() {
    await db.delete(authTable).where(lt(authTable.expiresAt, new Date()))
}

export async function pairingCode() {
    
    await deletePairingCodes()

    const code = Math.floor(1000 + Math.random() * 9000)
    const expiry = new Date(Date.now() + 5 * 60 * 1000)
    await db.insert(authTable).values({
        code: code.toString(),
        expiresAt: expiry
    })
    return code // for termux to show
}

export async function generateToken() {
    const bytes = new Uint8Array(32)

    crypto.getRandomValues(bytes)

    return Buffer.from(bytes).toString("hex")
}

export async function hashToken(token:string) {
    const hasher = new Bun.CryptoHasher("sha256");

    hasher.update(token)

    return hasher.digest("hex")
}