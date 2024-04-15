import mongoose from "mongoose";
import logger from "./logger";

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    logger.info("Already connected to MongoDB");
    return;
  }
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017",
      {
        dbName: "reday-tech",
      }
    );
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Failed to connect to MongoDB", { error });
  }
};

export default connectDb;
