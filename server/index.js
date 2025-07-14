// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();



// const app = express();
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// // Middleware

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));



// // Routes

// const jobRoutes=require("./routes/jobs.js")
// app.use("/api/jobs", jobRoutes); // ✅ NEW

// const employerRoutes = require("./routes/employers");
// app.use("/api/employers", employerRoutes);

// const employerAuthRoutes = require("./routes/employers");
// app.use("/api/employers", employerAuthRoutes);

// const workerRoutes = require('./routes/workers');
// app.use('/api/workers', workerRoutes);

// const authRoutes = require("./routes/auth");
// app.use("/api/auth", authRoutes);

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log("MongoDB connected");
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }).catch((err) => console.error(err));



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Imports
const employerJobRoutes = require("./routes/employerJobs");


const jobRoutes = require("./routes/jobs");
const employerRoutes = require("./routes/employers");
const workerRoutes = require("./routes/workers");
const authRoutes = require("./routes/auth");



// Route Use
app.use("/api/employer/jobs", employerJobRoutes);

app.use("/api/jobs", jobRoutes);           // ✅ Job Posting & Listing
app.use("/api/employers", employerRoutes); // ✅ Register/Login Employer & Profile
app.use("/api/workers", workerRoutes);     // ✅ Register/Login Worker & Profile
app.use("/api/auth", authRoutes);           // ✅ Shared auth (if needed)
app.use("/api/jobs", jobRoutes);           // ✅ Job Description



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((err) => console.error("❌ MongoDB connection error:", err));
