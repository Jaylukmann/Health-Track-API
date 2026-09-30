import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/RoutineTrackerDB.js";
import app from "./app.js";
dotenv.config();


const notificationJob = require("../health/notification.js");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3030;

app.listen(PORT, async () => {
    await connectDB();

    notificationJob();

    console.log(`Server running on port ${PORT}`);
});