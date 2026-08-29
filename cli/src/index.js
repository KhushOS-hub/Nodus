import { Command } from "commander"
import { uploadCommand } from "./command/upload.command"

const program = new Command()

program
    .name("homevault")
    .description("HomeVault command-line client")
    .version("1.0.0")


program.addCommand(uploadCommand)
program.parse()