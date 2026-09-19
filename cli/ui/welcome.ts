import pc from "picocolors"

function welcome(){
    console.log()

    console.log(pc.bold(pc.bgBlue("Welcome to Nodus")))
    console.log(pc.white("Your personal cloud, Your device, Your control"))

    console.log(pc.bold("Getting Started: "))
    console.log(`${pc.green("nodus init")}     Initialize and pair your server`)

    console.log(`${pc.yellow("nodus mkdir")}    Create a folder`)
    console.log(`${pc.yellow("nodus list")}     list files and folder`)
    console.log(`${pc.yellow("nodus watch")}    View/downloads a file` )
    console.log(`${pc.yellow("nodus init")}     Delete a file or folder`)

    console.log()
    console.log(pc.gray("Run `nodus --help` for more commands and information."))
    console.log()
 
}

export {welcome}