// Import required modules
const express = require("express");
const mongoose = require("mongoose");

// Initialize Express app
const app = express();
const port = 8000;

// ---------------------------------------------
// MongoDB Connection
// ---------------------------------------------
mongoose
  .connect("mongodb://localhost:27017/mydatabase")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// ---------------------------------------------
// Define User Schema & Model
// ---------------------------------------------
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // name field is mandatory
    },
    email: {
      type: String,
      required: true,
      unique: true, // ensures no duplicate emails
    },
    age: {
      type: Number,
      required: true, // age field is mandatory
    },
  },
  { timestamps: true } // automatically add createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema); // create a model named 'User'

// ---------------------------------------------
// Middleware
// ---------------------------------------------
// Middleware to parse URL-encoded form data (e.g., submitted from HTML forms)
app.use(express.urlencoded({ extended: false }));

// ---------------------------------------------
// Routes
// ---------------------------------------------

// ---------------------------------------------
// POST /users - Create a new user from form or POST body
// ---------------------------------------------
app.post("/users", async (req, res) => {
  try {
    // Create a new user with data from request body
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    });
    console.log("User created:", user);
    res.status(201).json(user); // return created user with 201 status
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(400).json({ error: err.message }); // bad request on validation or other errors
  }
});

// ---------------------------------------------
// GET /api/users - Return all users as JSON
// ---------------------------------------------
app.get("/api/users", async (req, res) => {
  const users = await User.find(); // fetch all users
  return res.json(users); // send as JSON response
});

// ---------------------------------------------
// GET / - Return HTML page with list of users
// ---------------------------------------------
app.get("/", async (req, res) => {
  try {
    const users = await User.find(); // fetch all users

    // Build HTML response with user list
    const html = `
      <h1>Users</h1>
      <ul>
        ${users
          .map((user) => `<li>${user.name} - ${user.email} - ${user.age}</li>`)
          .join("")}
      </ul>
    `;

    res.status(200).send(html); // send HTML page
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send(`<h1>Error: ${err.message}</h1>`); // error page on failure
  }
});

// --------------------------------------------
// GET /api/users/:ID - Find user by ID
// --------------------------------------------
app.get("/api/users/:ID", async (req, res) => {
  const user = await User.findById(req.params.ID); // find user by ID
  return res.json(user); // return found user as JSON
});

// --------------------------------------------
// PATCH /api/users/:ID - Update user name by ID
// --------------------------------------------
app.patch("/api/users/:ID", async (req, res) => {
  await User.findByIdAndUpdate(req.params.ID, { name: "nevil" }); // update user name to "nevil"
  return res.json({ message: "success" }); // respond with success message
});

// --------------------------------------------
// DELETE /api/users/:ID - Delete user by ID
// --------------------------------------------
app.delete("/api/users/:ID", async (req, res) => {
  await User.findByIdAndDelete(req.params.ID); // delete user by ID
  return res.json({ message: "success" }); // respond with success message
});

// ---------------------------------------------
// Start the Server
// ---------------------------------------------
app.listen(port, () => {
  console.log(`🚀 Server is running at: http://localhost:${port}`);
});