import mongoose from 'mongoose';
import config from './config.js'; // Ensure this path is correct
import logger from '../utils/logger.js';

let mainDbConnection;

const urlDB = config.DATABASE_URL;

export const connectToDatabases = async () => {
  try {
    // Establish the connection
    mainDbConnection = mongoose.createConnection(urlDB, {
      serverSelectionTimeoutMS: 30000,
    });

    mainDbConnection.on('connected', () => logger.info('Connected to main MongoDB database'));
    mainDbConnection.on('error', (err) => logger.error(`Error connecting to main MongoDB database: ${err.message}`));

    // Wait for the connection
    await mainDbConnection.asPromise();
    logger.info('Main database connection established successfully.');
  } catch (err) {
    logger.error(`Error connecting to MongoDB databases: ${err.message}`);
    throw err;
  }
};

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
connectToDatabases().catch((err) => {
  logger.error(`Failed to initialize database connections: ${err.message}`);
  process.exit(1);
});
