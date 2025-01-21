import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.polygon.io/",
});

apiClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer 0cOq2zQNG1gW4Fsy4kYLG7_YMBzrz5bu`;

    return config;
  },
  (error) => Promise.reject(error)
);

export { apiClient };
