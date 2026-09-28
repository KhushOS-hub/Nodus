//This file is for the server connection command

import { Command } from "commander"
import { pairCode, serverURL } from "../prompt/init"
import { authVerificationCli } from "../api/auth.cli"
import { saveToken } from "../auth/token.storage"

export const init = new Command("init")
    .description("Initialize and pair your server")
    .action(async () => {
        const url = await serverURL()
        const code = await pairCode()
        const result = await authVerificationCli(url, code)

        if (result.success && result.accessToken) {
            await saveToken(result.accessToken, result.serverUrl)
        }

        console.log(result.message)
    })