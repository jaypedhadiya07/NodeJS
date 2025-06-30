// ---------------------------------------------------
// Import required modules
// ---------------------------------------------------
const express = require("express");
const User = require("../Models/users.Schema"); // Mongoose User model

// ---------------------------------------------------
// Controller: Serve an HTML page with user list
// ---------------------------------------------------
const htmlList = async (req, res) => {
  try {
    const users = await User.find(); // fetch all users from DB

    // Build HTML response containing the list of users
    const html = `
      <h1>Users</h1>
      <ul>
        ${users
          .map((user) => `<li>${user.name} - ${user.email} - ${user.age}</li>`)
          .join("")}
      </ul>
    `;

    res.status(200).send(html); // send HTML response
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send(`<h1>Error: ${err.message}</h1>`); // send error page if fetch fails
  }
};

// ---------------------------------------------------
// Controller: Create a new user
// ---------------------------------------------------
const CreateUser = async (req, res) => {
  try {
    // Create new user using request body data
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    });
    console.log("User created:", user);
    res.status(201).json(user); // respond with created user and HTTP 201 Created
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(400).json({ error: err.message }); // respond with 400 Bad Request on errors
  }
};

// ---------------------------------------------------
// Controller: Retrieve all users as JSON
// ---------------------------------------------------
const allUsers = async (req, res) => {
  const users = await User.find(); // fetch all users
  return res.json(users); // return users as JSON response
};

// ---------------------------------------------------
// Controller: Find a user by ID
// ---------------------------------------------------
const FindUserById = async (req, res) => {
  const user = await User.findById(req.params.ID); // find user by MongoDB ID
  return res.json(user); // return found user as JSON
};

// ---------------------------------------------------
// Controller: Update a user by ID
// ---------------------------------------------------
const UpdateUserById = async (req, res) => {
  await User.findByIdAndUpdate(req.params.ID, { name: "nevil" }); // update user's name to "nevil"
  return res.json({ message: "success" }); // respond with success message
};

// ---------------------------------------------------
// Controller: Delete a user by ID
// ---------------------------------------------------
const DeleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.ID); // delete user by MongoDB ID
  return res.json({ message: "success" }); // respond with success message
};

// ---------------------------------------------------
// Export all controllers for routing
// ---------------------------------------------------
module.exports = {
  htmlList,
  CreateUser,
  allUsers,
  FindUserById,
  UpdateUserById,
  DeleteUserById,
};