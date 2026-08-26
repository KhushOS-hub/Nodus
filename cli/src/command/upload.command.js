import { Command } from "commander"
import { askForFile, askForFolder } from "../prompt/upload.prompt"
import { inspectFile } from "../utils/file.js"

export const uploadCommand = new Command("upload")
    .description("Upload a file")
    .argument('[file]', "file to upload")
    .argument('[folder]')
    .action(async (file, folder) => {

        if (!file) {
            file = await askForFile()
        }

        if (!folder) {
            folder = await askForFolder()
        }

        console.log("File:", file)
        console.log("Folder:", folder)

        try {
            const metadata = await inspectFile(file)

            console.log("File Information")
            console.log("Name:", metadata.originalName)
            console.log("Size:", metadata.size, "bytes")
            console.log("MIME:", metadata.mimeType)
            console.log("Folder:", folder)

        } catch (error) {
            console.error(
                "✗",
                error instanceof Error
                    ? error.message
                    : "Failed to inspect file"
            )

            process.exitCode = 1
        }
    })

