import { axiosInstance } from "@/api/axios-instance";
import { apiResponseMiddleware } from "@/middleware/api-response";

import { ApiResult } from "@/types/api-response";
import { SessionType } from "@/types/session";

import { getToken } from "./index";

const API_ENDPOINT = "Professor/UpdatePassword";

export const changeSessionPassword = async ({
  newPassword,
  oldPassword
}: {
  newPassword: string;
  oldPassword: string;
}): Promise<ApiResult<SessionType> | null> => {
  const token = getToken();

  return await apiResponseMiddleware<SessionType>(
    axiosInstance.post(API_ENDPOINT, {
      data: {
        id: token,
        oldPassword,
        newPassword
      }
    }),
    () => {
      window.location.replace("/");
    },
    {
      showToast: true
    }
  );
};
