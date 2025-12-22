import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    let client = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`mongodb connected successfully at ${client.connection.host}`);
  } catch (error) {
    console.log("mongodb connection failed", error);
  }
};
