import { apiResponseMiddleware } from "@/middleware/api-response";
import axios from "axios";

import { EntityType } from "@/types/form/entity";

const API_URL = import.meta.env.VITE_FORM_API_URL as string;
const API_ENDPOINT = "api/Entity/all";

export const getAllEntities = async (): Promise<EntityType[] | null> => {
  return await apiResponseMiddleware<EntityType[]>(
    axios.get(`${API_URL}/${API_ENDPOINT}`),
    () => {},
    {
      showToast: false
    }
  );
};
