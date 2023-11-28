const express = require('express');
const app = express();
const port = 3000;

// Hardcoded user data
let users = [
  { id: 1, username: 'john_doe', email: 'john@example.com' },
  { id: 2, username: 'jane_smith', email: 'jane@example.com' }
];

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Get a specific user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Create a new user
app.post('/users', (req, res) => {
  const newUser = req.body; // Assuming the request body contains the new user data
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update an existing user
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body; // Assuming the request body contains the updated user data
  users = users.map(user => (user.id === userId ? updatedUser : user));
  res.json(updatedUser);
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter(user => user.id !== userId);
  res.json({ message: 'User deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
