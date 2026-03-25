import axios from "axios";

const API_BASE_URL = "http://localhost:8081"; // Update this if your backend runs on a different port

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors untuk token, error handling, dll
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error);
    throw error;
  },
);

export default apiClient;
