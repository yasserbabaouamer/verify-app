import axios from "axios";

const ApiInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // You can add more default config here (e.g., timeout, interceptors)
});

export default ApiInstance;
