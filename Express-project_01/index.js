// Import required modules
const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const port = 8000;

// Middleware - plugin to parse URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// Middleware 1: Adds a custom property 'username' to the request object
app.use((req, res, next) => {
  console.log("Middleware 1");
  req.username = "jay"; // Set custom data on the request
  const date = new Date()
  fs.appendFile("log.txt",`\nTIME:${date.toLocaleTimeString()} Path:${req.path} IPADDRESS:${req.ip} METHOD:${req.method}`,(error, data) => {
      next(); // Pass control to the next middleware
  })
});

// Middleware 2: Accesses the custom 'username' set in the previous middleware
app.use((req, res, next) => {
  console.log("Middleware 2");
  console.log("My name is: " + req.username); // Use the custom data
  next(); // Pass control to the next middleware or route
});

// Note: The 'req.username' property can now be accessed in any routes that follow

// ------------------------------------------
// Basic HTML Route: Display user first names
// ------------------------------------------
app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
  return res.send(html);
});

// ---------------------
// REST API Routes
// ---------------------

// GET: List all users as JSON
app.get("/api/users", (req, res) => {
  return res.json(users);
});

// POST: Create a new user
app.post("/api/users", (req, res) => {
  // Get new user data from form
  const body = req.body;
  console.log(body);

  // Add new user to the array with a new ID
  users.push({ ...body, id: users.length + 1 });

  // Save updated users array to the JSON file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

/*  ------------------------------
    Alternative: Individual routes
    ------------------------------
app.get("/api/users/:ID", (req, res) => {
  const id = Number(req.params.ID);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

app.patch("/api/users/:ID", (req, res) => {
  //Todo: Edit the user with id
  return res.json({ status: "pending" });
});

app.delete("/api/users/:ID", (req, res) => {
  //Todo: Delete the user with id
  return res.json({ status: "pending" });
});
*/

// -------------------------------
// Chained routes with .route()
// -------------------------------
app
  .route("/api/users/:ID")
  // GET: Fetch user by ID
  .get((req, res) => {
    const id = Number(req.params.ID);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })

  // PATCH: Edit user by ID
  .patch((req, res) => {
    //Todo: Edit the user with id
    const id = Number(req.params.ID);
    const user = users.find((user) => user.id === id);
    Object.assign(user, req.body);
    return res.json(user);
  })

  // DELETE: Remove user by ID
  .delete((req, res) => {
    const id = Number(req.params.ID);
    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);
    return res.json({ status: "success" });
  });

// ----------------------------
// Start the server
// ----------------------------
app.listen(port, () => console.log("Server Started at port: " + port));