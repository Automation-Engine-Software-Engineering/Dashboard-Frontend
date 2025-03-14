import { axiosInstance } from "@/api/axios-instance";
import { apiResponseMiddleware } from "@/middleware/api-response";

import { SessionType } from "@/types/session";

import { getToken } from ".";

const API_ENDPOINT = "Professor/GetProfessorInfo";

export const getSession = async (): Promise<SessionType | null> => {
  return await apiResponseMiddleware<SessionType>(
    axiosInstance.get(API_ENDPOINT, {
      params: {
        userId: getToken()
      }
    }),
    () => {},
    {
      showToast: false
    }
  );
};
