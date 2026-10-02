import joi from "joi";

const createNotificationSchema = joi.object({
    title: joi.string().min(7).required(),

    message: joi.string().min(12).required(),

    userId: joi.string().required(),

    title: joi.string().min(7).max(100).required(),

    message: joi.string().min(12).max(500).required(),

    type: joi.string()
            .valid(
                'VITAL_ALERT',
                'MEDICATION_REMINDER',
                'GOAL_STREAK'
            )
            .required(),

    dataPayload: joi.string(),

    isRead: joi.boolean().required(),

    dataPayload: joi.object().optional(),

    isRead: joi.boolean().default(false),

    status: joi.string()
                .valid(
                    'pending',
                    'processing',
                    'sent',
                    'failed'
                )
                .default("pending")
                .required(),
    
    sentAt: joi.date().allow(null).default(null)
    
});


const createNotificationValidation = (req, res, next) => {
    const { error, value } = createNotificationSchema.validate(req.body,

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

    title: joi.string().min(7).max(100),

    message: joi.string().min(12).max(500),

    type: joi.string()
            .valid(
                'VITAL_ALERT',
                'MEDICATION_REMINDER',
                'GOAL_STREAK'
            )
            .required(),

    dataPayload: joi.string(),

    isRead: joi.boolean().required(),

    dataPayload: joi.object(),

    isRead: joi.boolean(),

    status: joi.string()
                .valid(
                    'pending',
                    'processing',
                    'sent',
                    'failed'
                )
                .required(),
    
    sentAt: joi.date().allow(null)
});


const updateNotificationValidation = (req, res, next) => {
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

export default {
    createNotificationValidation,
    updateNotificationValidation
}