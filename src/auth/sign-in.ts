import { axiosInstance } from "@/api/axios-instance";
import { apiResponseMiddleware } from "@/middleware/api-response";
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

const API_ENDPOINT = "Professor/Login";

export const signIn = async ({ credentials, redirect = "/" }: SignInProps) => {
  return apiResponseMiddleware<LoginResponse>(
    axiosInstance.get(API_ENDPOINT, {
      params: {
        username: credentials.username,
        password: credentials.password
      }
    }),
    (data) => {
      if (data.status) {
        setToken(data.userId.toString());
        toast.success("خوش آمدید", {
          id: "api-middleware"
        });
        window.location.replace(redirect);
      } else {
        toast.error("نام کاربری یا رمز عبور اشتباه است", {
          id: "api-middleware"
        });
      }
    },
    {
      showToast: true,
      loadingMessage: "درحال ورود..."
    }
  );
};
