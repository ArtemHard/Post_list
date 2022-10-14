import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.react-learning.ru/",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.common["Authorization"] = token;
  return config;
});
