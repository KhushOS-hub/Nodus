import { Command } from "commander"
import {init} from "./init"
import { mkdir } from "./folders"
import fileCommand from "./file"

const program = new Command()

program
    .name("Nodus")
    .description("A Personal Cloud Platform")
    .version("0.0.1")

program.addCommand(init)
program.addCommand(mkdir)
program.addCommand(fileCommand)

export default program