// import exppress from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { dbConnection } from "./database/dbConnection.js";
// import { errorMiddleware } from "./middlewares/error.js";
// import reservationRouter from "./routes/reservationRoute.js";


// const app = exppress()
// dotenv.config({path: './config/config.env'});

// app.use(cors({
//     origin: [process.env.FRONTEND_URI],
//     methods: ["POST"],
//     credentials: true,
// }));
// app.use(exppress.json());
// app.use(exppress.urlencoded({ extended: true }));
// app.use('/api/v1/reservation', reservationRouter);

// dbConnection();

// app.use(errorMiddleware);

// export default app;


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";

dotenv.config({ path: './config/config.env' });

const app = express();

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
app.use('/api/v1/reservation', reservationRouter);

// Connect to database
dbConnection();

// Error handling middleware
app.use(errorMiddleware);


app.use(cors({
    origin: "*",
    methods: "*",
}));

export default app;



