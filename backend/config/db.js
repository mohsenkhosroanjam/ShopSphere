import mongoose from 'mongoose';
import config from './config.js'; // Ensure this path is correct
import logger from '../utils/logger.js';

let mainDbConnection;

const urlDB = 'mongodb://127.0.0.1:27017/Store';

export const connectDB = async () => {
  try {
    // if (!process.env.MONGO_URI) {
    //   console.error("MongoDB connection URI is missing in environment variables.");
    //   process.exit(1);
    // }

    const conn = await mongoose.connect(urlDB);

    console.log(`Successfully connected to MongoDB: ${conn.connection.host} 👍`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
};

export default connectDB;

export const getMainDb = () => {
  if (!mainDbConnection) {
    throw new Error('Main DB connection is not established yet.');
  }
  return mainDbConnection;
};

export const closeConnections = async () => {
  try {
    if (mainDbConnection) {
      await mainDbConnection.close();
      logger.info('All MongoDB connections closed');
    }
  } catch (err) {
    logger.error(`Error closing MongoDB connections: ${err.message}`);
  }
};

// Initialize connection
connectDB().catch((err) => {
  logger.error(`Failed to initialize database connections: ${err.message}`);
  process.exit(1);
});
