import app from "./app.js";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import dotenv from "dotenv";

dotenv.config();

const port = parseInt(process.env.PORT ?? "8000", 10);
const dbFileName = process.env.DB_FILE_NAME;

if (!dbFileName) {
    throw new Error("DB_FILE_NAME is not defined");
}

const sqlite = new Database(dbFileName);

export const db = drizzle({
    client: sqlite,
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});