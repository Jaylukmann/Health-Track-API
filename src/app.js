import express from "express";
import cors from "cors";
<<<<<<< HEAD:src/app.js
import path from "path";

=======
>>>>>>> ec93d60 (NOTIFICATION ADDED):app.js

import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";

import userRoutes from "./routes/userRoutes.js";
import routineRoutes from "./routes/routineRoutes.js";
import notifyRoutes from "./routes/notificationRoutes.js";

import notifyCron from "./cron/notificationCron.js";


const app = express();


const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://healthtrack-webapp.netlify.app",
    "https://health-track-seven-rho.vercel.app",
];


app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);


app.use(express.json());


// Health check
app.get("/health", (req, res) => {

    res.status(200).json({
        message: "Routine-Tracker-API is running successfully",
        status: "OK"
    });

});


<<<<<<< HEAD:src/app.js

app.use("/api/routine",routineRoutes);
=======
// Start notification cron
notifyCron();


// Routes
app.use("/api/notification", notifyRoutes);

app.use("/api/routine", routineRoutes);

>>>>>>> ec93d60 (NOTIFICATION ADDED):app.js
app.use("/api/users", userRoutes);


// Middleware
app.use(logger);

app.use(errorHandler);


export default app;