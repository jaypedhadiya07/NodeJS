const mongoose = require("mongoose");

// Define URL schema
const urlSchema = new mongoose.Schema(
  {
    // Unique short ID for the shortened URL
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    // The original URL to redirect to
    redirectURL: {
      type: String,
      required: true,
    },
    // Array of visit history entries with timestamps
    visitHistory: [
      {
        timestamp: { type: Number }, // Store visit time as a number (e.g., Date.now())
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create URL model from the schema
const URL = mongoose.model("Url", urlSchema);

// Export the URL model
module.exports = URL;