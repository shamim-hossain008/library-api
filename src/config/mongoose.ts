import mongoose from "mongoose";

export const connectMongoose = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("✅ MongoDB connected (Mongoose)");
  } catch (error) {
    console.error("❌ Mongoose connection failed:", error);
    process.exit(1);
  }
};
