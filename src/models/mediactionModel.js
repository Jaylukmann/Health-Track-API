import mongoose from 'mongoose'

const medicationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        medicationName: {
            type: String,
            required: true,
            trim: true
        },

        dosage: {
            type: String,
            required: true,
            trim: true
        },

        reminderTime: {
            type: String,
            required: true,
            match: /^([01]\d|2[0-3]):([0-5]\d)$/
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date
        },

        isActive: {
            type: Boolean,
            default: true
        },

        notes: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Medication", medicationSchema);