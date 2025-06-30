// ---------------------------------------------------
// Import required modules
// ---------------------------------------------------
const mongoose = require("mongoose");

// ---------------------------------------------------
// Function: Connect to MongoDB
// ---------------------------------------------------
// Accepts a MongoDB connection URL and connects using mongoose.
// Logs success or error messages accordingly.
const Connected = async (url) => {
  const connecting = await mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to MongoDB"); // log successful connection
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err); // log any connection errors
    });
  return connecting; // return the connection promise
};

// ---------------------------------------------------
// Export the Connected function for use in other files
// ---------------------------------------------------
module.exports = {
  Connected,
};
