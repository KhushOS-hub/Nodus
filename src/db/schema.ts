import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const foldersTable = sqliteTable("folders",{
    id:int().primaryKey({autoIncrement:true}),
    name:text().notNull().unique(),
    createdAt:int({ mode: "timestamp" }).notNull().$defaultFn(() => new Date())
})