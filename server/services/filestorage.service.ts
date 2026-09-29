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

// For file upload from cli to backend i.e Phone
import fs from "node:fs"
import path from "node:path"
import { pipeline } from "node:stream/promises"
import { createFile } from "./file.service"
import { eq } from "drizzle-orm"
import { db } from "../index"
import { foldersTable } from "../db/schema"

export async function getFolderNameById(folderId: number) {
    const folder = await db
        .select({
            name: foldersTable.name
        })
        .from(foldersTable)
        .where(eq(foldersTable.id, folderId))
        .limit(1);

    return folder[0]?.name ?? null
}

export async function uploadFileService({
    originalName,
    folderId,
    mimeType,
    stream
}: {
    originalName: string
    folderId: number
    mimeType: string
    stream: NodeJS.ReadableStream
}) {
    const safeName = path.basename(originalName)

    const name = await getFolderNameById(folderId)
    if (!name) {
        throw new Error("Folder not found")
    }

    const folderPath = path.resolve(
        `./storage/nodus/${name}`
    );

    await fs.promises.mkdir(folderPath, {
        recursive: true
    });

    const filePath = path.join(
        folderPath,
        safeName
    );

    await pipeline(
        stream,
        fs.createWriteStream(filePath)
    );

    const stat = await fs.promises.stat(filePath);

    const file = await createFile({
        originalName,
        storedName: safeName,
        mimeType,
        size: stat.size,
        path: filePath,
        folderId
    });

    return file;
}