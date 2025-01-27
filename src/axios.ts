import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.polygon.io/",
});


apiClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${import.meta.env.VITE_POLYGON_API_KEY}`;

    return config;
  },
  (error) => Promise.reject(error)
);

export { apiClient };
