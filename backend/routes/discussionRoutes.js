// routes/discussionRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/Email");

const {
  createMessage,
  getMessages,
} = require("../controllers/discussionController");

// Route to create a message
router.post("/", createMessage);

module.exports = router;
