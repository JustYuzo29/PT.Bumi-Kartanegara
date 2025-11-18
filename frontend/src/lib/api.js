import axios from "axios";
import { mockApi } from "../mocks/mockAxios.js";

// Check if we should use mock API
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true";

// Base URL for API
// ⚠️ IMPORTANT: Default menggunakan Mock API (standalone mode)
// Aplikasi TIDAK terhubung ke backend Django
const BASE_URL = import.meta.env.VITE_API_URL || "/mock-api";

// Create axios instance or use mock
const api = USE_MOCK_API
  ? mockApi
  : axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

// Request interceptor to add auth token
if (!USE_MOCK_API) {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("access_token");
        localStorage.removeItem("tipe");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
}

export { api };
