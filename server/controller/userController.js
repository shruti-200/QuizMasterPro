const User = require("../models/userModel");

// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
