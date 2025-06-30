const express = require("express");
const urlRoute = require("./Routes/url");
const { Connected } = require("./Config/Connection.js"); // MongoDB connection function
const URL = require("./Models/url.js");
const { handleGetAnalytics } = require("./Controllers/url.js");

// Connect to MongoDB
Connected("mongodb://localhost:27017/url");

const app = express();
const port = 8000;

// Middleware: Parse incoming JSON requests
app.use(express.json());

// Route: Short URL creation
app.use("/url", urlRoute);

// Route: Redirect to original URL using short ID
app.get("/:Id", async (req, res) => {
  try {
    const shortId = req.params.Id;

    // Find the URL entry and update visit history with current timestamp
    const entry = await URL.findOneAndUpdate(
      { shortID: shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    // Redirect to the original URL
    return res.redirect(entry.redirectURL);
  } catch (err) {
    console.error("Error in redirect route:", err);
    return res.status(500).send("Internal server error");
  }
});

// Route: Analytics for a short URL
app.get("/analytics/:shortId", handleGetAnalytics);

// Start the Express server
app.listen(port, () => {
  console.log(`🚀 Server is running at: http://localhost:${port}`);
});