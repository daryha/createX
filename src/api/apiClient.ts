// src/api/apiClient.ts

import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://create-x-back-gnn2fl0xy-daryhas-projects.vercel.app/",
  withCredentials: true, // Для работы с cookies
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
