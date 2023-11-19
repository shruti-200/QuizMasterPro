const { default: axiosInstance } = require(".");
const axios = require("axios");

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/register", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.post("/api/users/get-user-info");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const resetPasswordRequest = async (email) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/reset-password-request",
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const resetPassword = async (token, password) => {
  try {
    const response = await axios.post("/api/users/reset-password", {
      token,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const initiatePasswordReset = async (email) => {
  try {
    const response = await axios.post("/api/users/reset-password", { email });
    return response.data; // Assuming your API returns success status and message
  } catch (error) {
    throw new Error("An error occurred while initiating password reset.");
  }
};
