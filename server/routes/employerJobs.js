// GET /api/jobs/my - Get jobs posted by the logged-in employer
const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const authEmployer = require("../middleware/authEmployer"); // Middleware to extract employer from token


// to get jobs posted by the logged-in employer
router.get("/my", authEmployer, async (req, res) => {
  try {
    const jobs = await Job.find({ employerId: req.user._id })
      .populate("applicants.worker", "name email phone")
      .sort({ postedOn: -1 });

    res.json(jobs);
  } catch (err) {
    console.error("Error fetching employer jobs:", err);
    res.status(500).json({ error: "Server error" });
  }
});










// Get one job by ID (with applicants)
router.get("/:jobId", authEmployer, async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.jobId,
      employerId: req.user._id,
    }).populate("applicants", "name email phone");

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    console.error("Error fetching job:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
