import { Command } from "commander"
import {init} from "./init"

const program = new Command()

program
    .name("Nodus")
    .description("A Personal Cloud Platform")
    .version("0.0.1")

program.addCommand(init)

export default program