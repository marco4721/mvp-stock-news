import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.polygon.io/",
});

apiClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer YqdvjaNSFWViOQ6jjx6rKz2Igpl8fSss`;

    return config;
  },
  (error) => Promise.reject(error)
);

export { apiClient };
