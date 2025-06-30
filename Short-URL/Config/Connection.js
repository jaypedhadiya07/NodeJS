// Import mongoose library
const mongoose = require("mongoose");

// Connect to MongoDB using the provided URL
const Connected = async (url) => {
  const connecting = await mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
  return connecting; // Return the connection promise
};

// Export the Connected function
module.exports = {
  Connected,
};