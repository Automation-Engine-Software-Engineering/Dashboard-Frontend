import { AxiosError } from "axios";
import toast from "react-hot-toast";

import { axiosInstance } from "./axios-instance";

const API_ENDPOINT = "api/Role/login";

export const signIn = async (credentials: {
  username: string;
  password: string;
}): Promise<any | AxiosError<any>> => {
  const loadingToast = toast.loading("درحال دریافت اطلاعات");
  try {
    const response = await axiosInstance.post(
      `/${API_ENDPOINT}/${credentials.username}`,
      JSON.stringify(credentials.password),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.data?.status) {
      toast.success(response.data.message, {
        id: loadingToast
      });
      return response.data;
    } else {
      toast.error(response.data.Message, {
        id: loadingToast
      });

      throw new Error(response.data.message);
    }
  } catch (err) {
    toast.error("خطایی رخ داده است", {
      id: loadingToast
    });

    throw new Error(`error: ${err}`);
  }
};

export const getUserData = async (id: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/api/Role/GetRoleByuser/${id}`);

    if (response.data.status) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    throw new Error(`error: ${err}`);
  }
};
