import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_API_BASE_URL || "http://192.168.43.150:3000/",
  withCredentials: true,
});

export default axiosInstance;
