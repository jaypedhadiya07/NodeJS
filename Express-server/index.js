const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from HOME page " + req.query.username);
});
app.get("/about", (req, res) => {
  res.send("Hello from ABOUT page");
});
app.listen(8000, () => console.log("Server is started!"));