import { fetch } from "bun"
import pc from "picocolors"

async function authVerificationCli(url: string, code: string) {

    try {
        const response = await fetch(`${url}/api/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code
            })
        })

        const data = await response.json() as { token?: string }

        if (response.ok) {
            if (!data.token) {
                return {
                    success: false,
                    message: pc.redBright("Authentication response did not contain a token"),
                }
            }
            return {
                success: true,
                message: `${pc.greenBright("Connected")}`,
                serverUrl: url,
                accessToken: data.token

            }
        }

        if (response.status === 401) {
            return {
                success: false,
                message: `${pc.red("Pairing Code is Invalid")}`,
            }
        }

        return {
            success: false,
            message: `${pc.redBright("Authentication Failed")}`,
        }

    } catch {
        return {
            success: false,
            message: "Server URL is invalid or unreachable",
        }
    }
}

export { authVerificationCli }