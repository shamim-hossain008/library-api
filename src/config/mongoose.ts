import mongoose from "mongoose";

export const connectMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ MongoDB connected (Mongoose)");
  } catch (error) {
    console.error("❌ Mongoose connection failed:", error);
    process.exit(1);
  }
};
