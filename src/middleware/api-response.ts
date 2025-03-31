import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

import { ApiResult } from "@/types/api-response";

type MiddlewareCallback<Data> = (data: ApiResult<Data>) => void | Promise<void>;

export const apiResponseMiddleware = async <Data>(
  apiCall: Promise<AxiosResponse<ApiResult<Data>>>,
  onSuccess: MiddlewareCallback<Data>,
  options?: {
    showToast?: boolean;
    loadingMessage?: string;
    errorMessage?: string;
  }
): Promise<ApiResult<Data> | null> => {
  if (options?.showToast) {
    toast.loading(options.loadingMessage || "درحال دریافت اطلاعات", {
      id: "api-middleware"
    });
  }

  try {
    const response = await apiCall;

    await onSuccess(response.data);
    return response.data;
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          options?.errorMessage ||
          "خطایی رخ داده است",
        {
          id: "api-middleware"
        }
      );
    } else {
      toast.error("خطایی رخ داده است", {
        id: "api-middleware"
      });
    }

    console.error("API Error:", error);
    throw new Error("API Request Failed");
  }
};
