import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const foldersTable = sqliteTable("folders",{
    id:int().primaryKey({autoIncrement:true}),
    name:text().notNull().unique(),
    createdAt:int({ mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date())
})

export const filesTable = sqliteTable("files", {
    id:int().primaryKey({autoIncrement:true}),
    originalName:text().notNull(),
    storedName:text().notNull().unique(),
    mimeType:text().notNull(),
    size:int().notNull(),
    path:text().notNull(),
    folderId:int().notNull()
        .references(() => foldersTable.id),
    createdAt:int({ mode: "timestamp" })
        .notNull().$defaultFn(() => new Date()),
    updatedAt:int({ mode: "timestamp" })
        .notNull().$defaultFn(() => new Date())
})