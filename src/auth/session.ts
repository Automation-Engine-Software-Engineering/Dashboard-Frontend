import { api } from "@/api/axios-instance";
import { apiResponseMiddleware } from "@/middleware/api-response";

import { SessionType } from "@/types/session";

const API_ENDPOINT = "/api/Authentication/User";

export const getSession = async (): Promise<SessionType | null> => {
  const response = await apiResponseMiddleware<SessionType>(
    api.get(API_ENDPOINT),
    () => {},
    {
      showToast: false
    }
  );
  return response?.data ?? null;
};
