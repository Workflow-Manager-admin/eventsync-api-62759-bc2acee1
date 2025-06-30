const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// Simple in-memory storage for users
const users = [];

// PUBLIC_INTERFACE
function findUserByUsername(username) {
  /** Find a user by their username. */
  return users.find(u => u.username === username);
}

// PUBLIC_INTERFACE
function findUserById(id) {
  /** Find a user by their ID. */
  return users.find(u => u.id === id);
}

// PUBLIC_INTERFACE
async function registerUser({ username, password }) {
  /** Register a new user with hashed password. */
  if (findUserByUsername(username)) {
    throw new Error('Username already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: uuidv4(), username, password: hashedPassword };
  users.push(user);
  return { id: user.id, username: user.username };
}

// PUBLIC_INTERFACE
async function validateUser({ username, password }) {
  /** Validate username/password for login. */
  const user = findUserByUsername(username);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;
  return { id: user.id, username: user.username };
}

module.exports = {
  registerUser,
  validateUser,
  findUserById,
  findUserByUsername,
};
