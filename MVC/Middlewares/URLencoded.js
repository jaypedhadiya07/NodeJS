// ---------------------------------------------------
// Import required modules
// ---------------------------------------------------
const express = require("express");

// ---------------------------------------------------
// Create URL-encoded body parser middleware
// ---------------------------------------------------
// Parses incoming request bodies with URL-encoded payloads (e.g., form submissions).
// 'extended: false' uses the classic querystring library for parsing.
const URLencoded = express.urlencoded({ extended: false });

// ---------------------------------------------------
// Export the URLencoded middleware for use in other files
// ---------------------------------------------------
module.exports = URLencoded;