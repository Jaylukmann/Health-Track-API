const Notification = require("../models/notificationModel");

const createNotification = async (notificationData) => {
    const notification = await Notification.create({
        ...notificationData
    });

    return notification;
};


const getUserNotification = async (userId) => {
    return await Notification.find({ user: userId })   
                            .sort({ createdAt: -1 });
};


const markAsRead = async (notificationId) => {
    return await Notification.findByIdAndUpdate(
        notificationId,
        {
            isRead: true
        },
        {
            new: true
        }
    )
};


module.exports = {
    createNotification,
    getUserNotification,
    markAsRead
}