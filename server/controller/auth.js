const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Send reset password email
exports.sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Set an appropriate expiration time
    });

    // Send reset password email with token link
    const transporter = nodemailer.createTransport({
      // Set up your email transporter configuration
      host: "smtp.elasticemail.com", // Elastic Email SMTP host
      port: 2525, // Elastic Email SMTP port
      auth: {
        user: "sbarhate018@gmail.com", // Your Elastic Email username
        pass: "CC524118E8E32EAC8A846D366BF481DCB704", // Your Elastic Email password or API key
      },
    });

    const resetUrl = `http://localhost:3000/reset-password/${token}`;
    const mailOptions = {
      from: "sbarhate018@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `Click <a href="${resetUrl}">here</a> to reset your password.`,
      token: token,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ success: false, message: "Email sending failed" });
      }
      console.log("Email sent: " + info.response);
      return res
        .status(200)
        .json({ success: true, message: "Email sent successfully" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.userId) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Update user's password
    user.password = password;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
