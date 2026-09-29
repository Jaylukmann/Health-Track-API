
import express from "express";
import cors from "cors";
import path from "path";



import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import routineRoutes from "./routes/routineRoutes.js";


const app = express();

app.use(
  cors({
    origin: "http://localhost:5170",
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