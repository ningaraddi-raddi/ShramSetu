const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const Employer = require("../models/Employer");

// REGISTER employer
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Employer already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "employer",
    });

    await newUser.save();
    res.status(201).json({ message: "Employer registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});











// LOGIN employer
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email only
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Create JWT token using user's ID
    const token = jwt.sign(
      { _id: user._id }, // ✅ Fix here
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4. Send token and user data
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
