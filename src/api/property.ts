import { apiResponseMiddleware } from "@/middleware/api-response";
import axios from "axios";

import { PropertyType } from "@/types/form/property";

const API_URL = import.meta.env.VITE_FORM_API_URL as string;

export const getEntityProperties = async (
  entityId: string | number
): Promise<PropertyType[] | null> => {
  return await apiResponseMiddleware<PropertyType[]>(
    axios.get(`${API_URL}/${entityId}/peroperty`),
    () => {},
    {
      showToast: false
    }
  );
};
