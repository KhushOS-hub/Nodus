import { Command } from "commander"
import { uploadFilePrompt } from "../prompt/files/file.upload"
import { uploadFile } from "../api/file.cli"
import { getFolders } from "../api/folder.cli"
import pc from "picocolors";

const fileCommand = new Command("file")

fileCommand
    .command("upload")
    .description("Upload a file to Nodus")
    .action(async () => {
        try {
            const folders = await getFolders();

            const { filePath, folderId } =
                await uploadFilePrompt(folders);

            console.log(
                pc.cyan("\nUploading file...\n")
            );

            const result = await uploadFile(
                filePath,
                folderId as number
            );

            console.log(
                pc.green(
                    `✓ ${result.message}`
                )
            );

        } catch (error) {
            console.error(
                pc.red(
                    `✗ ${
                        error instanceof Error
                            ? error.message
                            : "File upload failed"
                    }`
                )
            );
        }
    });

export default fileCommand;