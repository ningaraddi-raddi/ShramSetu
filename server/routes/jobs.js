const express = require("express");
const Job = require("../models/Job");
const authEmployer = require("../middleware/authEmployer");
const authWorker = require("../middleware/authWorker"); // make sure you have this

const router = express.Router();



// POST /api/jobs
router.post("/", authEmployer, async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      wage,
      experience,
      type,
      urgent,
      description,
      tags,
      contactEmail,
      openings,
      deadline
    } = req.body;

    const job = new Job({
      title,
      company,
      location,
      wage,
      experience,
      type,
      urgent,
      description,
      tags,
      contactEmail,
      openings,
      deadline,
      employerId: req.user._id
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ error: "Error posting job" });
  }
});


// GET /api/jobs - Workers fetch jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("employerId", "name email").sort({ postedOn: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching jobs" });
  }
});


const mongoose = require('mongoose');

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid Job ID' });
  }

  try {
    const job = await Job.findById(id)
      .populate("employerId", "name email") // optional
      .populate("applicants.worker", "name email phone") // ✅ add this line
      .lean(); // optional: returns plain JS object

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job);
  } catch (err) {
    console.error("Error fetching job:", err);
    res.status(500).json({ error: 'Server error while fetching job' });
  }
});


// POST /api/jobs/:jobId/apply - Worker applies to a job
router.post("/:jobId/apply", authWorker, async (req, res) => {
  const jobId = req.params.jobId;
  const workerId = req.worker._id; // ✅ use worker from middleware

  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    if (!Array.isArray(job.applicants)) job.applicants = [];

    const alreadyApplied = job.applicants.some(
      (applicant) => applicant.worker?.toString() === workerId.toString()
    );

    if (alreadyApplied) {
      return res.status(400).json({ error: "Already applied to this job" });
    }

    job.applicants.push({ worker: workerId, status: "applied" });

    await job.save();

    res.json({ message: "Applied successfully" });
  } catch (err) {
    console.error("Apply error:", err);
    res.status(500).json({ error: "Server error while applying" });
  }
});




// PUT /api/jobs/:id - Employer updates job
// PUT /api/jobs/:id
router.put('/api/jobs/:id', authEmployer, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.employerId.toString() !== req.employer._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    Object.assign(job, req.body);
    await job.save();
    res.json({ message: 'Job updated successfully', job });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});





// DELETE /api/jobs/:id - Employer deletes job
router.delete('/api/jobs/:id', authEmployer, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.employerId.toString() !== req.employer._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await job.remove();
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete job' });
  }
});






module.exports = router;
