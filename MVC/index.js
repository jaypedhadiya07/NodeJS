// ---------------------------------------------------
// Import required modules
// ---------------------------------------------------
const express = require("express");
const { Connected } = require("./Config/Connection.js"); // MongoDB connection function
const URLencoded = require("./Middlewares/URLencoded.js"); // Middleware for parsing URL-encoded data
const router = require("./Routes/Users.routes.js"); // User routes
const Log = require("./Middlewares/Log.js"); // Middleware for logging requests

// ---------------------------------------------------
// Initialize Express app
// ---------------------------------------------------
const app = express();
const port = 8000;

// ---------------------------------------------------
// MongoDB Connection
// ---------------------------------------------------
// Connect to MongoDB using provided URI
Connected("mongodb://localhost:27017/mydatabase");

// ---------------------------------------------------
// Middlewares
// ---------------------------------------------------
// Middleware for parsing URL-encoded data (body parser)
app.use(URLencoded);

// Middleware for logging requests to a file named "Log.txt"
app.use(Log("Log.txt")); // Assumes Log middleware writes logs to given filename

// ---------------------------------------------------
// Routes
// ---------------------------------------------------
// Mount router on root path: handles requests like "/"
app.use("/", router);

// Mount same router on "/api/users": handles requests like "/api/users"
app.use("/api/users", router);

// ---------------------------------------------------
// Start the Server
// ---------------------------------------------------
// Start listening on specified port and log server URL to console
app.listen(port, () => {
  console.log(`🚀 Server is running at: http://localhost:${port}`);
});