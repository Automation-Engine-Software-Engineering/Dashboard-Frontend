import { getToken, setToken } from "@/auth";
import axios from "axios";

const API_URL = import.meta.env.VITE_FORM_API_URL as string;

export const apiProfile = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string
  // withCredentials: import.meta.env.MODE === "development" ? false : true
});

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(
  (config) => {
    // if (import.meta.env.MODE === "development") {
    const { accessToken } = getToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken } = getToken();

      const response = await axios.get(
        `${API_URL}/api/Authentication/GenerateToken`,
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        }
      );
      if (response.status === 200) {
        // if (import.meta.env.MODE === "development") {
        const newToken = response.data.data;
        setToken({
          accessToken: newToken.accessToken,
          refreshToken: newToken.refreshToken
        });
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${newToken.accessToken}`;
        originalRequest.headers["Authorization"] =
          `Bearer ${newToken.accessToken}`;
        // }
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
