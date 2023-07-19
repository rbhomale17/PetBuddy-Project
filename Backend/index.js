// server.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectToDatabase = require('./config/db'); // Import the connect function

// Load environment variables from .env file
dotenv.config();

// Use the PORT environment variable or default to 3000
const port = process.env.PORT || 3000;

// Connect to the MongoDB database and start the server
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error starting the server:', error.message);
  });
