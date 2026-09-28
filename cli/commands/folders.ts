import {Command} from 'commander'
import {folderCreation} from '../prompt/folder.mkdir'

export const mkdir = new Command("mkdir")
    .description("Makes a folder directory")
    .action(async () => {
        await folderCreation()
    })