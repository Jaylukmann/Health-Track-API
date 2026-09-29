
import mongoose from "mongoose";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const connectDB = async (retries = 5, delay = 2000) => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set in the environment");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Routine-Tracker-API connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    if (retries > 0) {
      console.log(`Retrying MongoDB connection in ${delay}ms... (${retries} retries left)`);
      await sleep(delay);
      return connectDB(retries - 1, Math.min(delay * 2, 30000));
    }

    console.error("Exceeded MongoDB connection retries. Exiting.");
    process.exit(1);
  }
};

export default connectDB;