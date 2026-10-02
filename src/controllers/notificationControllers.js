import NotificationService from "../services/notificationService.js";


// CREATE NOTIFICATION
const createNotification = async (req, res, next) => {
    try {

        const {
            title,
            message,
            type,
            dataPayload,
            isRead,
            status,
            sentAt
        } = req.body;


        const newNotification =
            await NotificationService.createNotification({
                userId: req.user.id,
                title,
                message,
                type,
                dataPayload,
                isRead,
                status,
                sentAt
            });


        return res.status(201).json({
            message: "Notification created successfully",
            notification: newNotification
        });

    } catch (error) {
        next(error);
    }
};


// GET ALL USER NOTIFICATIONS
const getAllUserNotification = async (req, res, next) => {
    try {

        const {
            page = 1,
            limit = 10
        } = req.query;


        const notification =
            await NotificationService.getUserNotification(
                req.user.id,
                Number(page),
                Number(limit)
            );


        return res.status(200).json({
            message: "All notifications fetched successfully",
            notification
        });

    } catch (error) {
        next(error);
    }
};


// GET ONE USER NOTIFICATION
const getOneUserNotification = async (req, res, next) => {
    try {

        const notification =
            await NotificationService.getOneUserNotification(
                req.params.id,
                req.user.id
            );


        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }


        return res.status(200).json({
            message: "Single notification fetched successfully",
            notification
        });

    } catch (error) {
        next(error);
    }
};


// GET UNREAD NOTIFICATIONS
const getUnreadNotification = async (req, res, next) => {
    try {

        const {
            page = 1,
            limit = 10
        } = req.query;


        const notification =
            await NotificationService.getUnreadNotifications(
                req.user.id,
                Number(page),
                Number(limit)
            );


        return res.status(200).json({
            message: "Unread notifications fetched successfully",
            notification
        });

    } catch (error) {
        next(error);
    }
};


// UPDATE NOTIFICATION
const updateNotification = async (req, res, next) => {
    try {

        const notification =
            await NotificationService.updateNotification(
                req.params.id,
                req.user.id,
                req.body
            );


        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }


        return res.status(200).json({
            message: "Notification updated successfully",
            notification
        });

    } catch (error) {
        next(error);
    }
};


// MARK AS READ
const markAsReadNotification = async (req, res, next) => {
    try {

        const notification =
            await NotificationService.markAsRead(
                req.params.id,
                req.user.id
            );


        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }


        return res.status(200).json({
            message: "Notification marked as read",
            notification
        });

    } catch (error) {
        next(error);
    }
};


// MARK AS NOT READ
const markAsNotReadNotification = async (req, res, next) => {
    try {

        const notification =
            await NotificationService.markAsNotRead(
                req.params.id,
                req.user.id
            );


        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }


        return res.status(200).json({
            message: "Notification marked as unread",
            notification
        });

    } catch (error) {
        next(error);
    }
};


export default {
    createNotification,
    getOneUserNotification,
    getAllUserNotification,
    getUnreadNotification,
    updateNotification,
    markAsReadNotification,
    markAsNotReadNotification
};