import express from "express";
import cors from "cors";
import path from "path";


import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import routineRoutes from "./routes/routineRoutes.js";


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

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Routine-Tracker-API is running successfully",
    status: "OK"
  });
});



app.use("/api/routine",routineRoutes);
app.use("/api/users", userRoutes);
app.use(logger);
app.use(errorHandler);


export default app;