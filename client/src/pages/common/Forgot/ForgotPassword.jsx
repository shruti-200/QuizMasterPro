import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      await axios.post("/auth/forgot-password", { email });
      setMessage("Password reset email sent");
    } catch (error) {
      setMessage("User not found");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword}>Send Reset Email</button>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
