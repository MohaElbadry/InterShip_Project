const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Use JWT_SECRET here
    req.user = verified; // Assign to req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
module.exports = authMiddleware;

function verifyJWTToken(token) {
  // Changed to function declaration for consistency
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken);
    });
  });
}
