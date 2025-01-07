const config = {
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/Store', // Replace with your DB URL
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
  };
  
  export default config;
  