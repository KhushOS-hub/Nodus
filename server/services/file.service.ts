//Contains Only DataBase Operation i.e Logical Files
import { db } from "../index.js";
import { filesTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import type{ FileData } from "../types/file.types.js";

export const createFile = async (fileData: FileData) => {
    return await db
        .insert(filesTable)
        .values(fileData)
        .returning()
}

export const updateFile = async (id: number, originalName: string, size: number) => {
    return await db
        .update(filesTable)
        .set({ originalName, size, updatedAt: new Date() })
        .where(eq(filesTable.id, id))
        .returning()
}

export const deleteFile = async (id: number) => {
    return await db
        .delete(filesTable)
        .where(eq(filesTable.id, id))

}

// Retrive the files
export const getFiles = async () => {
    return await db
        .select()
        .from(filesTable)
}

export const getFile = async (id: number) => {
    return await db
        .select()
        .from(filesTable)
        .where(eq(filesTable.id, id))
        .get()
}