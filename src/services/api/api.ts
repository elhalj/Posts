import axios from "axios";
import { useAuthStore } from "../../store/authStore";

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: "https://api-article-g253.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
// interceptor for token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    // If the token exists, set it in the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      console.log("Erreur", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
