const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // example: { _id: ..., role: "employer", iat: ..., exp: ... }
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(400).json({ error: "Invalid token" });
  }
};


// This middleware checks if the user is authenticated as an employer
// It expects a JWT in the Authorization header