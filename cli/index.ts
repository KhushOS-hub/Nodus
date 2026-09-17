import { Command } from "commander"
import { welcome } from "./ui/welcome"


const program = new Command()

program
    .name("Nodus")
    .description("A Personal Cloud Platform")
    .version("0.0.1")

program
    .command("init")
    .description("Initialize and pair your Nodus server")
    .action(() => {
        console.log("Initializing...");
    })

if (process.argv.length <= 2) {
    welcome()
} else{program.parse()}

