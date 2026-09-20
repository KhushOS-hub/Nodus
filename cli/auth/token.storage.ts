import { mkdir, writeFile, readFile } from "node:fs/promises"
import path from "node:path"
import os from "node:os"

const NODUS_DIR = path.join(os.homedir(), ".config", "nodus")
const CREDENTIALS_FILE = path.join(NODUS_DIR, "credentials.json")

async function saveToken(accessToken: string) {
    await mkdir(NODUS_DIR, { recursive: true })

    await writeFile(
        CREDENTIALS_FILE,
        JSON.stringify({ accessToken }, null, 2),
        {
            encoding: "utf-8",
            mode: 0o600
        }
    )
}

async function getToken() {
    try {
        const data = await readFile(CREDENTIALS_FILE, "utf-8")
        const credentials = JSON.parse(data)

        return credentials.accessToken
    } catch {
        return null
    }
}

export { saveToken, getToken }