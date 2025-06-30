// ---------------------------------------------------
// Import required modules
// ---------------------------------------------------
const fs = require("fs"); // Node.js file system module for writing logs
const path = require("path"); // Node.js path module (not used here, but imported)

// ---------------------------------------------------
// Log middleware factory function
// ---------------------------------------------------

const Log = (path) => {
  return (req, res, next) => {
    const date = new Date(); // Current date and time
    const logMessage = `${date.toLocaleTimeString()} - ${req.method} - ${
      req.url
    }\n`;

    // Append the log message to the specified file
    fs.appendFile(path, logMessage, (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      }
    });

    next(); // Continue to the next middleware or route handler
  };
};

// ---------------------------------------------------
// Export the log middleware factory
// ---------------------------------------------------
module.exports = Log;