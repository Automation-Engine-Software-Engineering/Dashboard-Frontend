import { AxiosResponse } from "axios";
import toast from "react-hot-toast";

import { ApiResult } from "@/types/api-response";

type MiddlewareCallback<Data> = (data: Data) => void | Promise<void>;

export const apiResponseMiddleware = async <Data>(
  apiCall: Promise<AxiosResponse<ApiResult<Data>>>,
  onSuccess: MiddlewareCallback<Data>,
  options?: {
    showToast?: boolean;
    loadingMessage?: string;
    errorMessage?: string;
  }
): Promise<any> => {
  if (options?.showToast) {
    toast.loading(options?.loadingMessage || "درحال دریافت اطلاعات", {
      id: "api-middleware"
    });
  }

  try {
    const response = await apiCall;
    const { status, message, data } = response.data;

    if (!status) {
      if (options?.showToast) {
        toast.error(message || options?.errorMessage || "خطایی رخ داده است", {
          id: "api-middleware"
        });
      }
    }
    await onSuccess(data);
    return data ? data : null;
  } catch (error) {
    toast.error("خطای ناشناخته‌ای رخ داده است", {
      id: "api-middleware"
    });
    console.error("API Error:", error);
    return false;
  }
};
