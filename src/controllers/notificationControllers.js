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

const updateNotification = async (req, res, next) => {
    const { title, message, type, dataPayload, isRead, status, sentAt } = req.body;

    const notification = await NotificationService.markAsRead(
        req.params.id,
        req.body
    );

    if(!notification){
        return res.status(404).json({
            message: `Missing Information`
        });
    }

    return res.status(200).json({
        message: `Notification updated successfully`,
        notification: notification
    });

}