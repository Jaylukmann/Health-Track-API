const NotificationService = require("../services/notificationService");

const createNotification = async (req, res, next) => {
    try{
        const { title, message, type, dataPayload, isRead, status, sentAt } = req.body;
        const newNotification = new NotificationService.createNotification({
            userId: req.user.Id,
            title, 
            message, 
            type, 
            dataPayload, 
            isRead, 
            status, 
            sentAt
        });

        await newNotification.save();

        return res.status(200).json({
            message: `Notification created successfully`,
            notification: newNotification,
        });

    }catch(error){
        next(error);
    }
}