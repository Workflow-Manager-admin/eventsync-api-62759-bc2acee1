const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';

// PUBLIC_INTERFACE
function authenticateToken(req, res, next) {
  /** Middleware: Authenticate JWT for protected routes. */
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Missing token. Please login.' });
  }
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' });
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
