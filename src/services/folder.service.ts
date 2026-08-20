import { db } from "../index.js";
import { foldersTable } from "../db/schema.js";

export async function createFolder(name: string) {
    return await db
        .insert(foldersTable)
        .values({
            name
        })
        .returning();
}

export async function getFolders() {
    return await db
        .select()
        .from(foldersTable);
}