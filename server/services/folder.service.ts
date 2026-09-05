import { db } from "../index.js";
import { foldersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

export async function createFolder(name: string, parentId: number | null) {
    return await db
        .insert(foldersTable)
        .values({
            name,
            parentId
        })
        .returning();
}

export async function getFolderById(id: number) {
    return await db
        .select()
        .from(foldersTable)
        .where(eq(foldersTable.id, id))
}

export async function getFolders() {
    return await db
        .select()
        .from(foldersTable);
}

export async function getFolder(name: string) {
    return await db
        .select()
        .from(foldersTable)
        .where(eq(foldersTable.name, name))
}

//This File is for the db operation i.e logical operations