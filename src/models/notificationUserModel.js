const mongoose = require("mongoose");

const userNotificationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "USER",
        },

        email: {
            type: String,
            required: true
        },

        devices: [{
            platform: {
                type: String,
                enum: [
                    'ios',
                    'andriod',
                    'web'
                ]
            }
        }],

        notificationPreferences: {
            pushEnabled: {
                type: Boolean, 
                default: true
            }
        }
    },

    {
        timestamps: true
    }
);

const userNotification = mongoose.model("User", userNotificationSchema);

module.exports = userNotification;