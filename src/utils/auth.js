import axiosClient from "./axiosClient";

// ===== Auth Endpoints =====
export const registerUser = (data) => axiosClient.post("/auth/register", data);
export const loginUser = (data) => axiosClient.post("/auth/login", data);
export const logoutUser = (data) => axiosClient.post("/auth/logout", data);
export const updateProfile = (userId, data) =>
  axiosClient.put(`/auth/update-profile/${userId}`, data);
export const refreshToken = () => axiosClient.post("/auth/refresh");

// Google Login
export const loginGoogle = () => axiosClient.get("/auth/google");
export const googleCallback = () => axiosClient.get("/auth/google/callback");

// Admin endpoints
export const getAllUsers = () => axiosClient.get("/auth/get-all-user");
export const updateUserRole = (userId, data) =>
  axiosClient.put(`/auth/update-user-role/${userId}`, data);

// Stats
export const countUsers = () => axiosClient.get("/auth/count");
