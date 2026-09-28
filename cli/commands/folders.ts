import {Command} from 'commander'
import {folderCreation} from '../prompt/folder.mkdir'
import { postFolder } from '../api/folder.cli'

export const mkdir = new Command("mkdir")
    .description("Makes a folder directory")
    .action(async () => {
        const folder = await folderCreation()
        await postFolder(folder.folderName)
    })