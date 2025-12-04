import axios from "axios";

const isVercel =
  typeof window !== "undefined" &&
  window.location.hostname.includes("vercel.app");

const axiosClient = axios.create({
  baseURL: isVercel ? "/api" : import.meta.env.VITE_API_URL, // LOCAL ONLY
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
