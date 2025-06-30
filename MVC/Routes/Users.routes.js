// ---------------------------------------------------
// Import required modules
// ---------------------------------------------------
const express = require("express");
const {
  htmlList, // Controller to return a simple HTML list page
  CreateUser, // Controller to create a new user
  allUsers, // Controller to retrieve all users
  FindUserById, // Controller to find a user by ID
  UpdateUserById, // Controller to update a user by ID
  DeleteUserById, // Controller to delete a user by ID
} = require("../Controllers/user");

const router = express.Router(); // Create a new router instance

// ---------------------------------------------------
// Routes
// ---------------------------------------------------

// GET / -> Serve a basic HTML page or user list
router.route("/").get(htmlList);

// POST /users -> Create a new user
router.route("/users").post(CreateUser);

// GET /api/users -> Retrieve all users
router.route("/api/users").get(allUsers);

// GET, PATCH, DELETE /api/users/:ID -> CRUD operations on a specific user
router
  .route("/api/users/:ID")
  .get(FindUserById) // Find a user by ID
  .patch(UpdateUserById) // Update a user by ID
  .delete(DeleteUserById); // Delete a user by ID

// ---------------------------------------------------
// Export the router to use in the main app
// ---------------------------------------------------
module.exports = router;