import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

import { ApiData, ApiResult } from "@/types/api-response";

type MiddlewareCallback<Data> = (data: ApiData<Data>) => void | Promise<void>;

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
      toast.error(message || options?.errorMessage || "خطایی رخ داده است", {
        id: "api-middleware"
      });

      throw Error(message || options?.errorMessage || "خطایی رخ داده است");
    }
    await onSuccess({
      ...data,
      data: data.data
    });
    return data
      ? {
          ...data,
          data: data.data
        }
      : null;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error("خطای ناشناخته‌ای رخ داده است", {
        id: "api-middleware"
      });
    }
    console.error("API Error:", error);
    throw Error("error");
  }
};
