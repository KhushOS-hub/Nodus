import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import { configDotenv } from "dotenv"
configDotenv({ path: "./.env" })

const app = express()

app.use(express.urlencoded({ extended: true, limit: "16kb" }))

//Cors Configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? [],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"]
}))

app.use(express.json({ limit: "16kb" }))

//api endpoints
import postFolder from "./routes/folder.routes.js"
import getFolder from "./routes/folder.routes.js"

app.use("/api",postFolder)
app.use("/api",getFolder)

//HealthCheck
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Home Cloud API is running"
    });
});

export default app