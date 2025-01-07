import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("MongoDB connection URI is missing in environment variables.");
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Successfully connected to MongoDB: ${conn.connection.host} 👍`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
};

export default connectDB;
