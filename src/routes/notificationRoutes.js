import express from "express";

const notifyRoute = express.Router();

import {
    createNotificationValidation,
    updateNotificationValidation
} from "../validators/notificationValidators";


import {
    createNotification,
    getOneUserNotification,
    getAllUserNotification,
    getUnreadNotification,
    updateNotification,
    markAsReadNotification,
    markAsNotReadNotification
} from "../controllers/notificationControllers";


notifyRoute.get("/test", (req, res) => {
    res.status(200).json({
        message: `Notiication running successully`,
    });
});


// Get all notifications for a user
notifyRoute.get("/", getAllUserNotification);

// Get all unread notiication for a user
notifyRoute.get("/unread", getUnreadNotification);

// Get one notification
notifyRoute.get("/:id", getOneUserNotification);

// Create a notiication
notifyRoute.post("/", createNotificationValidation, createNotification);

// Update a notification
notifyRoute.put("/:id", updateNotificationValidation, updateNotification);

// Mark notification as read
notifyRoute.patch("/:id/read", markAsReadNotification);

// Mark notification as not read
notifyRoute.patch("/:id/unread", markAsNotReadNotification);


export default notifyRoute