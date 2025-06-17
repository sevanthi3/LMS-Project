import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/v1";


export const axiosUserInstance = axios.create({
  baseURL: `${BASE_URL}/user`,
  withCredentials: true,
});

export const axiosAuthInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosCourseInstance = axios.create({
  baseURL: `${BASE_URL}/courses`,
  withCredentials: true,
});

export const axiosPaymentInstance = axios.create({
  baseURL: `${BASE_URL}/payment`,
  withCredentials: true,
});

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
