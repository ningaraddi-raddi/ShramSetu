const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');
const authWorker = require("../middleware/authWorker"); // ✅ Correct middleware for workers

// POST: Add a new worker (admin or public use, not for login)
router.post('/add', async (req, res) => {
  try {
    const worker = new Worker(req.body);
    await worker.save();
    res.status(201).json({ message: 'Worker added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Get all or filtered workers
router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const workers = await Worker.find(filters);
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SEARCH: Advanced search by skill, pincode, wage
router.get("/search", async (req, res) => {
  const { skill, pincode, minWage, maxWage } = req.query;
  const query = {};

  if (skill) {
    query.skill = { $regex: new RegExp(skill, "i") }; // Case-insensitive
  }
  if (pincode) {
    query.pincode = pincode.toString();
  }
  if (minWage || maxWage) {
    query.wage = {};
    if (minWage) query.wage.$gte = parseInt(minWage);
    if (maxWage) query.wage.$lte = parseInt(maxWage);
  }

  try {
    const workers = await Worker.find(query);
    res.json(workers);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Failed to fetch workers" });
  }
});

// GET: Logged-in worker profile
router.get("/me", authWorker, async (req, res) => {
  try {
    const worker = await Worker.findOne({ user: req.user.id }); // req.user set by authWorker
    if (!worker) return res.status(404).json({ msg: "Worker not found" });
    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT: Update logged-in worker profile
router.put("/me", authWorker, async (req, res) => {
  try {
    const updates = req.body;
    const worker = await Worker.findOneAndUpdate(
      { user: req.user.id },
      { $set: updates },
      { new: true }
    );
    if (!worker) return res.status(404).json({ msg: "Worker not found" });
    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
