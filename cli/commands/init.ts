//This file is for the server connection command

import { Command } from "commander"
import { pairCode, serverURL } from "../prompt/init"
import { authVerificationCli } from "../api/auth.cli"

export const init = new Command("init")
    .description("Initialize and pair your server")
    .action(async () => {
        const url = await serverURL()
        const code = await pairCode()
        const result = await authVerificationCli(url, code)

        
        console.log(result.message)
    })