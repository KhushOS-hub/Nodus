import program from "./commands/index"
import { welcome } from "./ui/welcome"

welcome()

program.parseAsync()

