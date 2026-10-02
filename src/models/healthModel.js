import mongoose from mongoose;

const healthSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        systolic: {
            type: Number,
            required: true,
            min: 0
        },

        diastolic: {
            type: Number,
            required: true,
            min: 0
        },

        heartRate: {
            type: Number,
            min: 0
        },

        bloodSugar: {
            type: Number,
            min: 0
        },

        temperature: {
            type: Number,
            min: 0
        },

        weight: {
            type: Number,
            min: 0
        },

        goalStreak: {
            type: Number,
            default: 0,
            min: 0
        },

        recordedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);


const healthModel = mongoose.model("Health", healthSchema);

export default healthModel