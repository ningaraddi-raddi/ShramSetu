// const mongoose = require('mongoose');

// const WorkerSchema = new mongoose.Schema({
//   name: String,
//   skill: String,
//   location: String,
//   pincode: String,
//   wage: Number,
//   experience: String,
//   available: Boolean,
//   languages: [String],
//   photoUrl: String,
//   phone: String
// });

// module.exports = mongoose.model("Worker", WorkerSchema);


// models/Worker.js
const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true // One worker profile per user
  },
  name: String,
  skill: String,
  location: String,
  pincode: String,
  wage: Number,
  experience: String,
  available: Boolean,
  languages: [String],
  photoUrl: String,
  phone: String
});


module.exports = mongoose.models.Worker || mongoose.model("Worker", WorkerSchema);
