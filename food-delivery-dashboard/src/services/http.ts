// src/services/http.ts
import axios, {
  AxiosError,
  type AxiosRequestHeaders,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { AuthStorageKeys } from "../types/auth";

const API_BASE_URL =
  import.meta.env.VITE_BASE_PRODUCTION_URL || "http://localhost:5000/api";

//Create axios instance
const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  } as AxiosRequestHeaders,
});

//req interceptor : inject token :
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(AuthStorageKeys.TOKEN);
    if (token) {
      // Ensure headers exist and cast
      if (!config.headers) config.headers = {} as AxiosRequestHeaders;
      (config.headers as AxiosRequestHeaders)["Authorization"] =
        `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

//res interceptor : handle global error
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem(AuthStorageKeys.TOKEN);
      console.warn("Unauthorzed! Please login again.");
    }

    if (status && status >= 500) {
      console.error("Server error. Please try again later.");
    }

    if (error.code === "ECONNABORTED") {
      console.error("Requst timeout. Check your connection.");
    }

    console.error("API ERROR", error.response?.data || error.message);

    return Promise.reject(error);
  },
);

export default http;
