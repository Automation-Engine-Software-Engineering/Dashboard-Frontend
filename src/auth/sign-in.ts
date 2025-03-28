import { apiResponseMiddleware } from "@/middleware/api-response";
import axios from "axios";
import toast from "react-hot-toast";

import { setToken } from ".";

interface SignInProps {
  credentials: {
    username: string;
    password: string;
  };
  redirect?: string;
}

interface LoginResponse {
  userId: number;
  status: boolean;
}

const API_URL = import.meta.env.VITE_FORM_API_URL as string;
const API_ENDPOINT = "api/Authentication/Login";

export const signIn = async ({ credentials, redirect = "/" }: SignInProps) => {
  return apiResponseMiddleware<LoginResponse>(
    axios.post(
      `${API_URL}/${API_ENDPOINT}/${credentials.username}`,
      JSON.stringify(credentials.password),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ),
    ({ data }: any) => {
      // if (import.meta.env.MODE === "development") {
      setToken({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      });
      // }
      toast.success("ورود موفقیت آمیز بود", {
        id: "api-middleware"
      });
      window.location.replace(redirect);
    },
    {
      showToast: true,
      loadingMessage: "درحال ورود..."
    }
  );
};
