// const mongoose = require("mongoose");

// const jobSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   location: { type: String, required: true },
//   wage: { type: String, required: true },
//   postedOn: { type: Date, default: Date.now },
//   employerId: { type: mongoose.Schema.Types.ObjectId, ref: "Employer", required: true },
//   applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Worker" }],
// });

// const Job = mongoose.model("Job", jobSchema);
// module.exports = Job;




const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  wage: { type: String, required: true }, // salary or wage
  experience: { type: String },           // e.g., "2+ years"
  type: { type: String },                 // e.g., "Full-time", "Internship"
  urgent: { type: Boolean, default: false },
  description: { type: String },          // detailed job description
  tags: [{ type: String }],               // ["React", "Node.js"]
  contactEmail: { type: String },         // for worker contact
  openings: { type: Number, default: 1 }, // number of available positions
  deadline: { type: Date },               // application deadline

  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
    required: true,
  },

  // applicants: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Worker"
  // }],
applicants: [
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker"
    },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected"],
      default: "applied"
    }
  }
],

  postedOn: { type: Date, default: Date.now },
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
