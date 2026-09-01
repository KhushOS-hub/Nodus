import { createReadStream, createWriteStream } from "node:fs"
import { mkdir, access, unlink, stat, readFile, writeFile } from "node:fs/promises"

// createDirectory(), fileExists(), deleteFile(), getFileStats()

export async function ensureDirectory(path: string) {

    await mkdir(path, { recursive: true })
    return path

}

export async function fileExists(path: string) {
    try {
        await access(path)
        return true
    } catch {
        return false
    }
}

export async function deleteFile(path: string) {
    try {
        await unlink(path)
        return true
    } catch {
        return false
    }
}

export async function fileInfo(path: string) {
    try {
        const info = await stat(path)
        return info

    } catch {
        return false
    }
}

// file i/o txt

export async function readSmallFile(path: string) {
    const MAX_SMALL_FILE_SIZE = 10 * 1024 * 1024
    try {
        const info = await stat(path)
        if (info.size > MAX_SMALL_FILE_SIZE) {
            throw new Error("File must be under 10MB")
        }
        return await readFile(path)
    } catch (error) {
        return false
    }
}

export async function writeSmallFile(path: string, data: string) {
    const MAX_SMALL_FILE_SIZE = 10 * 1024 * 1024
    try {

        const size = Buffer.byteLength(data, "utf8")
        if (size > MAX_SMALL_FILE_SIZE) {
            throw new Error("File size exceeded 10MB")
        }
        await writeFile(path, data)
        return true
    } catch (error) {
        return false
    }
}

// stream larger data

export function streamReadFile(path: string) {
        return createReadStream(path)
}

export function streamWriteFile(path: string) {
        return createWriteStream(path)
}