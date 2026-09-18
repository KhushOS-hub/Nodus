import { timestamp } from "drizzle-orm/cockroach-core";
import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const foldersTable = sqliteTable("folders", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    parentId: int(),
    createdAt: int({ mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date())
}, (table) => [
    uniqueIndex("folders_parent_id_name_unique")
        .on(table.parentId, table.name),
])

export const filesTable = sqliteTable("files", {
    id: int().primaryKey({ autoIncrement: true }),
    originalName: text().notNull(),
    storedName: text().notNull().unique(),
    mimeType: text().notNull(),
    size: int().notNull(),
    path: text().notNull(),
    folderId: int().notNull()
        .references(() => foldersTable.id),
    createdAt: int({ mode: "timestamp" })
        .notNull().$defaultFn(() => new Date()),
    updatedAt: int({ mode: "timestamp" })
        .notNull().$defaultFn(() => new Date())
})

// auth schema
export const authTable = sqliteTable("auth", {
    id: int().primaryKey({ autoIncrement: true }),
    code: text().notNull(),
    expiresAt: int({ mode: "timestamp" }).notNull(),
    tokenHash: text(),
    createdAt: int({ mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date())
})