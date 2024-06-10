import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();
dotenv.config({ path: './config/config.env' });



// CORS configuration
app.use(cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["POST"],
    credentials: true,
}));

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/reservation', reservationRouter);
app.get("/", (req, res, next)=>{return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN"
  })})
// Connect to database
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;



