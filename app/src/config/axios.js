import axios from "axios";
const token = () => localStorage.getItem("token");
export const axiosInstance = axios.create({
  baseURL: "https://api.react-learning.ru/",
  headers: { Authorization: `Bearer ${token()}` },
});
