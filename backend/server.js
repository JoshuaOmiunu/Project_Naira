// server.js (or app.js)

require("dotenv").config(); // Load environment variables at the top

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path"); // Required for serving static files

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/naira_backend";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Default Route to Show Backend is Running
app.get("/", (req, res) => {
  res.send("Project Naira Backend is Running 🚀");
});
// Routes
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const discussionRoutes = require("./routes/discussionRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/discussion", discussionRoutes);
