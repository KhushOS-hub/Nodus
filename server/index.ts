import app from './app.js';
import { drizzle } from 'drizzle-orm/libsql'

const port = parseInt(process.env.PORT ?? "8000", 10)
export const db = drizzle(process.env.DB_FILE_NAME!)

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})