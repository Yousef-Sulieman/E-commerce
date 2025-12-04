// src/utils/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err.response) {
      console.error("Network / CORS error", err);
      return Promise.reject(err);
    }
    if (err.response.status === 401) {
      console.log("Unauthorized");
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
