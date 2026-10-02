<<<<<<< HEAD
const mongoose = require("mongoose");
=======
import mongoose from "mongoose";
>>>>>>> ec93d60 (NOTIFICATION ADDED)

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },

        title: {
            type: String,
            required: true
        },

        message: {
            type: String,
            required: true
        },

        type: {
            type: String,
            enum: [
                'VITAL_ALERT',
                'MEDICATION_REMINDER',
                'GOAL_STREAK'
            ],
            required: true
        },

        dataPayload: {
            type: Map,
            of: String
        },

        isRead: {
            type: Boolean,
            default: false
        },
        
        status: {
            type: String,
            enum: [
                'pending',
                'processing',
                'sent',
                'failed'
            ],
            default: 'pending'
        },

        sentAt: {
            type: Date
        },

    },

    {
        timestamps: true
    }
);

const notificationModel = mongoose.model('Notification', notificationSchema);

<<<<<<< HEAD
module.exports = notificationModel;
=======
export default notificationModel;
>>>>>>> ec93d60 (NOTIFICATION ADDED)
