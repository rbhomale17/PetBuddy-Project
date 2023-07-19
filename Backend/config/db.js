const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Retrieve the MongoDB connection URI from the environment variables
const dbURI = process.env.MONGODB_URI;

// Connect to the MongoDB database and export the connection
const connect = async () => {
  try {
    const connection = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error; // Rethrow the error so the calling code can handle it
  }
};

module.exports = connect;
