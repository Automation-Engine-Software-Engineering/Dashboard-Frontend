import { api } from "@/api/axios-instance";
import { apiResponseMiddleware } from "@/middleware/api-response";

import { ApiResult } from "@/types/api-response";
import { SessionType } from "@/types/session";

const API_ENDPOINT = "/api/Authentication/changePassword";

export const changeSessionPassword = async ({
  newPassword,
  oldPassword
}: {
  newPassword: string;
  oldPassword: string;
}): Promise<ApiResult<SessionType> | null> => {
  return await apiResponseMiddleware<SessionType>(
    api.post(API_ENDPOINT, {
      oldPassword,
      newPassword
    }),
    () => {
      window.location.replace("/");
    },
    {
      showToast: true
    }
  );
};
