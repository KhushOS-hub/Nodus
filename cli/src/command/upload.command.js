import { Command } from "commander"
import { askForFile, askForFolder } from "../prompt/upload.prompt"
import { inspectFile } from "../utils/file.js"

export const uploadCommand = new Command("upload")
    .description("Upload a file")
    .argument("[file]", "file to upload")
    .action(async (file) => {

        if (!file) {
            file = await askForFile()
        }

        try {
            const metadata = await inspectFile(file)
            const folder = await askForFolder()

            console.log("\nFile Information")
            console.log("Name:", metadata.originalName)
            console.log("Size:", metadata.size, "bytes")
            console.log("MIME:", metadata.mimeType)
            console.log("Folder:", folder.name)
            console.log("Folder ID:", Number(folder.id))

        } catch (error) {
            console.error(
                "✗",
                error instanceof Error
                    ? error.message
                    : "Failed to upload file"
            )

            process.exitCode = 1
        }
    })
