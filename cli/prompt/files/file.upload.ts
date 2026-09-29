import { input, select } from "@inquirer/prompts";
import { getFolders } from "../../api/folder.cli";

export async function uploadFilePrompt(
    folders: {
        id: number
        name: string
    }[]
) {
    const filePath = await input({
        message: "Enter the file path:",
        validate: (value) => {
            if (!value.trim()) {
                return "File path is required"
            }

            return true
        }
    })

    const id = await getFolders()

    const folderId = await select({
        message: "Select the destination folder:",
        choices: [
            {
                name: "Root",
                value: null
            },
            ...folders.map((folder) => ({
                name: folder.name,
                value: folder.id
            }))
        ]
    })

    console.log("Selected folder ID:", folderId)

    return {
        filePath,
        folderId
    }
}