const express = require("express");
const { handleGenerateNewShortUrl } = require("../Controllers/url.js");

const router = express.Router();

// Route: Generate a new short URL
router.post("/", handleGenerateNewShortUrl);

// Export the router
module.exports = router;