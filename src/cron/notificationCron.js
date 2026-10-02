import cron from "node-cron";

import NotificationService from "../services/notificationService.js";
import HealthModel from "../models/healthModel.js";
import MedicationModel from "../models/medicationModel.js";
import Notification from "../models/notificationModel.js";


const checkPatientHealth = async () => {
    try {

        const patients = await HealthModel.find();

        const medications = await MedicationModel.find({
            isActive: true
        });


    
        // HEALTH CHECK

        for (const patient of patients) {

            if (
                patient.systolic >= 140 ||
                patient.diastolic >= 90
            ) {

                const existingNotification =
                    await Notification.findOne({
                        userId: patient.userId,
                        type: "VITAL_ALERT",
                        isRead: false,
                        createdAt: {
                            $gte: new Date(
                                Date.now() - 30 * 60 * 1000
                            )
                        }
                    });


                if (!existingNotification) {

                    await NotificationService.createNotification({
                        userId: patient.userId,
                        title: "Blood Pressure Alert",
                        message:
                            "Your latest blood pressure reading requires attention.",
                        type: "VITAL_ALERT",

                        dataPayload: {
                            systolic: patient.systolic,
                            diastolic: patient.diastolic
                        },

                        isRead: false,
                        status: "pending",
                        sentAt: null
                    });

                    console.log(
                        `Blood pressure notification created for ${patient.userId}`
                    );
                }
            }


            
            // GOAL STREAK

            if (patient.goalStreak === 7) {

                const existingStreakNotification =
                    await Notification.findOne({
                        userId: patient.userId,
                        type: "GOAL_STREAK",
                        isRead: false,
                        createdAt: {
                            $gte: new Date(
                                Date.now() - 24 * 60 * 60 * 1000
                            )
                        }
                    });


                if (!existingStreakNotification) {

                    await NotificationService.createNotification({
                        userId: patient.userId,
                        title: "Goal Streak",
                        message:
                            "Congratulations! You have maintained your health goal for 7 days.",
                        type: "GOAL_STREAK",

                        dataPayload: {
                            streak: patient.goalStreak
                        },

                        isRead: false,
                        status: "pending",
                        sentAt: null
                    });
                }
            }
        }



        // MEDICATION REMINDER
        const now = new Date();

        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();


        for (const medication of medications) {

            const [reminderHour, reminderMinute] =
                medication.reminderTime
                    .split(":")
                    .map(Number);


            if (
                currentHour === reminderHour &&
                currentMinute === reminderMinute
            ) {

                const existingMedicationNotification =
                    await Notification.findOne({
                        userId: medication.userId,
                        type: "MEDICATION_REMINDER",
                        "dataPayload.medicationId": medication._id,
                        createdAt: {
                            $gte: new Date(
                                Date.now() - 30 * 60 * 1000
                            )
                        }
                    });


                if (!existingMedicationNotification) {

                    await NotificationService.createNotification({
                        userId: medication.userId,

                        title: "Medication Reminder",

                        message:
                            `It is time to take your ${medication.medicationName}.`,

                        type: "MEDICATION_REMINDER",

                        dataPayload: {
                            medicationId: medication._id
                        },

                        isRead: false,

                        status: "pending",

                        sentAt: null
                    });

                    console.log(
                        `Medication reminder created for ${medication.userId}`
                    );
                }
            }
        }

    } catch (error) {

        console.error(
            "Health notification cron error:",
            error.message
        );
    }
};


// Run every minute
const notifyCron = () => {

    cron.schedule("* * * * *", async () => {

        console.log(
            "Checking patient health and medication reminders..."
        );

        await checkPatientHealth();

    });

};


export default notifyCron;