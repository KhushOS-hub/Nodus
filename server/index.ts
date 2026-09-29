import app from "./app.js"
import { DatabaseSync } from "node:sqlite"
import { drizzle } from "drizzle-orm/node-sqlite"
import dotenv from "dotenv"

dotenv.config()

const port = parseInt(process.env.PORT ?? "8000", 10)
const dbFileName = process.env.DB_FILE_NAME

if (!dbFileName) {
    throw new Error("DB_FILE_NAME is not defined")
}

const sqlite = new DatabaseSync(dbFileName)

export const db = drizzle({
    client: sqlite,
})

//Termux Interface for pairing to the cli

import { getLocalIp } from "./auth/ip.js"
import { pairingCode } from "./auth/auth.js"

const host = getLocalIp()
const pair = await pairingCode()
app.listen(port, "0.0.0.0", () => {
    console.log(`
Nodus Server
────────────
Local:   http://localhost:${port}
Network: http://${host}:${port}
Pair code: ${pair}
`)
})