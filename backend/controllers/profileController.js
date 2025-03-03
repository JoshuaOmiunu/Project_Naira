// controllers/profileController.js
const User = require("../models/User");
const path = require("path");

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Use req.user.userId
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const API_URL = process.env.VITE_API_URL || `${req.protocol}://${req.get("host")}`;

    // Fix the profilePicture path to be a full URL
    if (user.profilePicture) {
      user.profilePicture = `${API_URL}/${user.profilePicture.replace(
        /\\/g,
        "/"
      )}`;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;

  if (!req.user || !req.user.userId) {
    return res.status(400).json({ message: "User ID missing from request" });
  }

  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let isUpdated = false;
    if (name && user.name !== name) {
      user.name = name;
      isUpdated = true;
    }
    if (email && user.email !== email) {
      user.email = email;
      isUpdated = true;
    }

    if (req.file) {
      user.profilePicture = path.posix.join("uploads", req.file.filename);
      isUpdated = true;
    }

    if (isUpdated) {
      await user.save();
      const API_URL = process.env.VITE_API_URL || `${req.protocol}://${req.get("host")}`;


      const imageUrl = `${API_URL}/${
        user.profilePicture
      }`;

      return res.json({
        message: "Profile updated successfully",
        updated: true,
        user: {
          name: user.name,
          email: user.email,
          profilePicture: imageUrl,
        },
      });
    } else {
      return res.json({
        message: "No changes were made to the profile.",
        updated: false,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
