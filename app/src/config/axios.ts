import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.react-learning.ru/",
});

axiosInstance.interceptors.request.use((config:AxiosRequestConfig) :AxiosRequestConfig => {
  const token: string | null = localStorage.getItem("token");
  config.headers = config.headers ?? {}; 
  config.headers!.common["Authorization"] = token;

  return config;
});

