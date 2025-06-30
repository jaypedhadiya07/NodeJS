const express = require("express");
const shortid = require("shortid");
const URL = require("../Models/url.js");

// Controller: Generate a new short URL
async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;

  // Check if URL is provided in the request body
  if (!body.url) return res.status(400).json({ error: "url is required" });

  // Generate a unique short ID
  const shortId = shortid();

  // Create a new URL document in the database
  await URL.create({
    shortID: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  // Respond with the generated short ID
  return res.json({ id: shortId });
}

// Controller: Get analytics for a short URL
async function handleGetAnalytics(req, res) {
  const shortID = req.params.shortId;

  // Find the URL document by shortID
  const result = await URL.findOne({ shortID });

  // Respond with total clicks and visit history
  return res.json({
    totalClicks: result.visitHistory.length,
    Analytics: result.visitHistory,
  });
}

// Export controllers
module.exports = { handleGenerateNewShortUrl, handleGetAnalytics };