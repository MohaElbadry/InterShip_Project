const jwt = require("jsonwebtoken");

// function verifyJWTToken(token) {
//   console.log("ana da5l hnaya");
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
//       if (err || !decodedToken) {
//         return reject(err);
//       }
//       resolve(decodedToken);
//     });
//   });
// }

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
