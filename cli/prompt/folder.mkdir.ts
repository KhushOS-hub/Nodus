import { input, select } from "@inquirer/prompts"
import { getFolders } from "../api/folder.cli"

async function folderCreation() {

    const folderName: string = await (input({
        message: "?Enter the folder name",
        validate(value) {
            if (!value.trim()) {
                return "Url is required"
            }
            return true
        }
        
    }))

    const folders = await getFolders()
    const selectFolder = select({
        message: "Select the parent folder",
        choices: [
            {
                name: "Nodus (root)",
                value: null,
            },
            ...folders.map((folder) => ({
                name: folder.name,
                value: folder.id,
            })),
        ],
    })

    return { folderName, selectFolder }
}

export { folderCreation }