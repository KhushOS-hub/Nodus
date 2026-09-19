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

        if (response.ok) {
            return {
                success: true,
                message: `${pc.greenBright("Connected")}`,
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

export {authVerificationCli}
