import { input } from "@inquirer/prompts"

export async function askForFile() {
    const file = await input({
        message: "?File to upload:",
        validate(value) {
            if (!value.trim()) {
                return "File path is required"
            }
            return true
        }
    })
    return file
}
export async function askForFolder() {
    return await input({
        message: "To which folder:",
        validate(value) {
            if (!value.trim()) {
                return "Folder is required"
            }
            return true
        }
    })
}
