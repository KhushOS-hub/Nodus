import { select, input } from "@inquirer/prompts";
import { getFolders, createFolder } from "../api/folder"

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
    const folders = await getFolders()

    console.log("FOLDERS:", folders);

    const choices = folders.map((folder) => ({
        name: folder.name,
        value: folder,
    }));

    choices.push({
        name: "+ Create new folder",
        value: "create",
    });

    const selected = await select({
        message: "To which folder?",
        choices,
    });

    if (selected === "create") {
        const name = await input({
            message: "New folder name:",
        })

        const folder = await createFolder(name)
        console.log(folder)
        

        return folder;
    }
    console.log(selected);
    

    return selected;
}
