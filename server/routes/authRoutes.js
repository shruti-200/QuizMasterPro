const router = require("express").Router();
const { sendPasswordResetEmail, resetPassword } = require("../controller/auth");

router.post("/forgot-password", sendPasswordResetEmail);
// Route to reset the password
router.post("/reset-password", resetPassword);

module.exports = router;
