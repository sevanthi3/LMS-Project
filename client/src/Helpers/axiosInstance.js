import axios from "axios";

export const axiosUserInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/user",  // user-related routes (signup, profile, logout)
  withCredentials: true,
});

export const axiosAuthInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",  // auth routes (login)
  withCredentials: true,
});

export const axiosCourseInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/courses",
  withCredentials: true,
});

export const axiosPaymentInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/payment",
  withCredentials: true,
});


export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
});

