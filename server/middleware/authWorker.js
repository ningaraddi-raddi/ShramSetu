// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "worker") return res.status(403).json({ error: "Access denied" });

//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(400).json({ error: "Invalid token" });
//   }
// };







// const jwt = require("jsonwebtoken");

// const authWorker = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) {
//     return res.status(401).json({ error: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // ✅ Make sure to attach the user ID
//     req.user = { _id: decoded._id, role: decoded.role };

//     // ✅ Confirm worker role
//     if (decoded.role !== "worker") {
//       return res.status(403).json({ error: "Access denied for non-worker" });
//     }
//      req.user = worker;

//     next();
//   } catch (err) {
//     console.error("JWT verification failed:", err);
//     res.status(401).json({ error: "Token is not valid" });
//   }
// };

// module.exports = authWorker;

// middleware/authWorker.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Worker = require("../models/Worker");

const authWorker = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token. Login to apply" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user || user.role !== "worker") {
      return res.status(403).json({ message: "Access denied: Not a worker" });
    }

    const worker = await Worker.findOne({ user: user._id });
    if (!worker) {
      return res.status(404).json({ message: "Worker profile not found" });
    }

    req.user = user;        // The user document (basic info)
    req.worker = worker;    // The worker document (profile)

    next();
  } catch (err) {
    console.error("authWorker error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authWorker;
