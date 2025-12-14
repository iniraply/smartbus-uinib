// src/utils/api.js
import axios from "axios";

// 1. Buat instance Axios dengan Base URL dari .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Interceptor (Penyadap Otomatis)
// Setiap kali request dikirim, kode ini akan cek apakah ada token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
