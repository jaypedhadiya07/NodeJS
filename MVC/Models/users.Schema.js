// ---------------------------------------------------
// Import required modules
// ---------------------------------------------------
const mongoose = require("mongoose");

// ---------------------------------------------------
// Define the User schema
// ---------------------------------------------------
const userSchema = new mongoose.Schema(
  {
    // User's name: required string field
    name: {
      type: String,
      required: true, // name field is mandatory
    },
    // User's email: required and must be unique
    email: {
      type: String,
      required: true,
      unique: true, // ensures no duplicate emails
    },
    // User's age: required numeric field
    age: {
      type: Number,
      required: true, // age field is mandatory
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// ---------------------------------------------------
// Create the User model based on the schema
// ---------------------------------------------------
const User = mongoose.model("User", userSchema); // create a model named 'User'

// ---------------------------------------------------
// Export the User model for use in other files
// ---------------------------------------------------
module.exports = User;