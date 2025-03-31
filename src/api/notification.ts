import { apiResponseMiddleware } from "@/middleware/api-response";

import { api } from "./axios-instance";

const API_ENDPOINT = "/api/Notification";

export const getAllNotifications = async () =>
  await apiResponseMiddleware<string[]>(
    api.get(`${API_ENDPOINT}/all`, {}),
    () => {},
    {
      showToast: false
    }
  );
