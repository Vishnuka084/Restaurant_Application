import exppress from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js"

const app = exppress()
dotenv.config({path: './config/config.env'});

app.use(cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["POST"],
    credentials: true,
}));

app.use(exppress.json());
app.use(exppress.urlencoded({ extended: true }));

dbConnection();

export default app;