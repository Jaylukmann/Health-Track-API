import mongoose from "mongoose";
import userModel from "./userModel.js";

const routineSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      required: true,
      enum: [
        "medication",
        "exercise",
        "hydration",
        "sleep",
        "nutrition",
        "health_check",
        "appointment",
        "other"
      ],
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    frequency: {
      type: String,
      required: true,
      trim: true
    },

    time: {
      type: String,
      required: true,
      trim: true
    },
    
    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date
    },

    routineStatus: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const RoutineModel = mongoose.model("Routine", routineSchema);

export default RoutineModel;