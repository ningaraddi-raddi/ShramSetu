const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Worker = require("../models/Worker"); // Import Worker model
const router = express.Router();

// REGISTER Worker


router.post("/register", async (req, res) => {
  const { name, email, password, role, ...workerProfile } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    if (role === "worker") {
      const newWorker = new Worker({
        ...workerProfile,
        name, // or keep separate if needed
        user: newUser._id,
      });
      await newWorker.save();
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});





// 🛡️ WORKER LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // First find the user from the User collection
    const user = await User.findOne({ email, role: "worker" }); // ensure it's a worker
    if (!user) return res.status(400).json({ message: "Worker not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token with worker-specific payload
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Now find the corresponding worker profile
    const worker = await Worker.findOne({ user: user._id });
    if (!worker) return res.status(404).json({ message: "Worker profile not found" });

    res.json({
      token,
      worker: {
        id: worker._id,
        name: worker.name,
        email: user.email,
        phone: worker.phone,
      }
    });
  } catch (err) {
    console.error("Worker login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;