const jwt = require('jsonwebtoken');
const userService = require('../services/user');
const { validateRegister } = require('../middleware/validators');

const SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';

class UserController {
  // PUBLIC_INTERFACE
  async register(req, res) {
    /** Register a new user */
    const { username, password } = req.body;
    const error = validateRegister({ username, password });
    if (error) return res.status(400).json({ message: error });

    try {
      const user = await userService.registerUser({ username, password });
      // Issue JWT token on register for simplicity
      const token = jwt.sign(user, SECRET, { expiresIn: '2h' });
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  }

  // PUBLIC_INTERFACE
  async login(req, res) {
    /** Authenticate user and issue JWT token */
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required.' });
    }
    const user = await userService.validateUser({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
    // Issue JWT token
    const token = jwt.sign(user, SECRET, { expiresIn: '2h' });
    res.status(200).json({ user, token });
  }
}

module.exports = new UserController();
