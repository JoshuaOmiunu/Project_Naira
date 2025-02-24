// routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../multer");

const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

// Get user profile
router.get("/", auth, getProfile);

// Update user profile
router.put("/", auth, upload.single("profilePic"), updateProfile);

module.exports = router;