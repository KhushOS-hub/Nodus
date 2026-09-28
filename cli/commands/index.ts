import { Command } from "commander"
import {init} from "./init"
import { mkdir } from "./folders"
const program = new Command()

program
    .name("Nodus")
    .description("A Personal Cloud Platform")
    .version("0.0.1")

program.addCommand(init)
program.addCommand(mkdir)

export default program