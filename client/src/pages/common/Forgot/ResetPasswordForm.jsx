import React, { useState } from "react";
import axios from "axios";

const ResetPasswordForm = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      await axios.post("/auth/reset-password", {
        token,
        password: newPassword,
      });
      setMessage("Password reset successful");
    } catch (error) {
      setMessage("Password reset failed");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        type="text"
        placeholder="Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default ResetPasswordForm;