import { homedir } from "node:os"
import { readFileSync } from "node:fs"
import { join } from "node:path"

export interface Credentials {
  serverUrl: string;
  accessToken: string;
}

export function getCredentials(): Credentials {
  const credentialsPath = join(
    homedir(),
    ".config",
    "nodus",
    "credentials.json",
  )

  try {
    const file = readFileSync(credentialsPath, "utf-8")
    const credentials = JSON.parse(file) as Credentials

    if (!credentials.serverUrl || !credentials.accessToken) {
      throw new Error("Invalid Nodus credentials")
    }

    return credentials
  } catch {
    throw new Error(
      "Nodus is not initialized. Run `nodus init` first.",
    )
  }
}