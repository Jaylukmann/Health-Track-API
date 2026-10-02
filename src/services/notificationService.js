import Notification from "../models/notificationModel.js";


// CREATE
const createNotification = async (notificationData) => {

    const notification = await Notification.create({
        ...notificationData
    });

    return notification;
};


// GET ALL USER NOTIFICATIONS
const getUserNotification = async (
    userId,
    page = 1,
    limit = 10
) => {

    const skip = (page - 1) * limit;

    return await Notification.find({
        userId
    })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
};


// GET ONE NOTIFICATION
const getOneUserNotification = async (
    notificationId,
    userId
) => {

    return await Notification.findOne({
        _id: notificationId,
        userId
    });
};


// GET UNREAD NOTIFICATIONS
const getUnreadNotifications = async (
    userId,
    page = 1,
    limit = 10
) => {

    const skip = (page - 1) * limit;

    return await Notification.find({
        userId,
        isRead: false
    })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
};


// UPDATE
const updateNotification = async (
    notificationId,
    userId,
    data
) => {

    return await Notification.findOneAndUpdate(
        {
            _id: notificationId,
            userId
        },
        data,
        {
            new: true,
            runValidators: true
        }
    );
};


// MARK AS READ
const markAsRead = async (
    notificationId,
    userId
) => {

    return await Notification.findOneAndUpdate(
        {
            _id: notificationId,
            userId
        },
        {
            isRead: true
        },
        {
            new: true
        }
    );
};


// MARK AS NOT READ
const markAsNotRead = async (
    notificationId,
    userId
) => {

    return await Notification.findOneAndUpdate(
        {
            _id: notificationId,
            userId
        },
        {
            isRead: false
        },
        {
            new: true
        }
    );
};


export default {
    createNotification,
    getUserNotification,
    getOneUserNotification,
    getUnreadNotifications,
    updateNotification,
    markAsRead,
    markAsNotRead
};