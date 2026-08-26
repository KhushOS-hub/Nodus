import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import { configDotenv } from "dotenv"
configDotenv({ path: "./.env" })

const app = express()

//app.use(express.urlencoded({ extended: true, limit: "16kb" }))

//Cors Configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? [],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"]
}))

app.use(express.json({ limit: "16kb" }))

//api endpoints for folders
import postFolderRoute from "./routes/folder.routes.js"
import getFolderRoute from "./routes/folder.routes.js"

app.use("/api",postFolderRoute)
app.use("/api",getFolderRoute)

//api endpoints for files
import postFilesRoute from './routes/file.routes.js'
import deleteFileRoute from './routes/file.routes.js'
import updateFileRoute from './routes/file.routes.js'
import getFilesRoute from "./routes/file.routes.js"
import uploadFilesRoute from './routes/file.routes.js'

app.use("/api",postFilesRoute)
app.use("/api",deleteFileRoute)
app.use("/api",updateFileRoute)
app.use("/api",getFilesRoute)
app.use("/api",uploadFilesRoute)

//HealthCheck
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Home Cloud API is running"
    });
});

export default app