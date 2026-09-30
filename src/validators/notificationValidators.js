const joi = require("joi");

const createNotificationSchema = joi.object({
    title: joi.string().min(7).required(),
    message: joi.string().min(12).required(),
    type: joi.string()
            .valid(
                'VITAL_ALERT',
                'MEDICATION_REMINDER',
                'GOAL_STREAK'
            )
            .required(),
    dataPayload: joi.string(),
    isRead: joi.boolean().required(),
    status: joi.string()
                .valid(
                    'pending',
                    'processing',
                    'sent',
                    'failed'
                )
                .required(),
    
    sentAt: joi.date().required()
});

const notificationValidationSchema = async (req, res, next) => {
    const { error, value } = notificationSchema.validate(req.body,
        {
            abortEarly: false
        }
    );

    if(error){
        return res.status(404).json({
            message: error.details[0].message
        });
    }

    req.body = value;

    next();
}

const updateNotificationSchema = joi.object({
    title: joi.string().min(7).required(),
    message: joi.string().min(12).required(),
    type: joi.string()
            .valid(
                'VITAL_ALERT',
                'MEDICATION_REMINDER',
                'GOAL_STREAK'
            )
            .required(),
    dataPayload: joi.string(),
    isRead: joi.boolean().required(),
    status: joi.string()
                .valid(
                    'pending',
                    'processing',
                    'sent',
                    'failed'
                )
                .required(),
    
    sentAt: joi.date().required(),
});

const updateNotificationValidation = async (req, res, next) => {
    const { error, value } = updateNotificationSchema.validate(req.body, 
        {
            abortEarly: false
        }
    );

    if(error){
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    req.body = value;

    next();
}

module.exports = {
    createNotificationSchema,
    updateNotificationValidation
}