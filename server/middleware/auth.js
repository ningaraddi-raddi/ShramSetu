const jwt = require("jsonwebtoken");
const Worker = require("../models/Worker");

const authWorker = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const worker = await Worker.findById(decoded.id); // ✅ This must match login payload

    if (!worker) return res.status(401).json({ error: "Worker not found" });

    req.user = worker; // ✅ Required for `req.user._id` to work in /apply route
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};
