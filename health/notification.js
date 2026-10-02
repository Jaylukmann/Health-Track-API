const cron = require("node-cron");

const User = require("./models/notificationModel.js");
const NotificationService = require ("./services/notificationService.js");


const notificationJob = () => {
  // check your health status once a week
  cron.schedule("2 1 * * *", async () => {
    try{
      console.log("Running Health reminder job...");

      const users = await User.find({});

      for( const user of users){
        await NotificationService.createNotification({
          user: user._id,
          title: "Health Reminder",
          message: `Good ${new Day()}! Remeber to update your health information today.`,
          type: 'reminder'
        });
      }

      console.log("Health Reminder created successfully");
      
    }catch(error){
      console.error(`Notification job error: `, error);
    }

  });
};

module.exports = notificationJob;