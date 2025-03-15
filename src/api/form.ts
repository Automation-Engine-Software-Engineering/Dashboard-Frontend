import { apiResponseMiddleware } from "@/middleware/api-response";
import axios from "axios";

import { FormType } from "@/types/form/form";

const API_URL = import.meta.env.VITE_FORM_API_URL as string;
const API_ENDPOINT = "api/Form";

export const getAllForms = async (): Promise<FormType[] | null> => {
  return await apiResponseMiddleware<FormType[]>(
    axios.get(`${API_URL}/${API_ENDPOINT}/all`),
    () => {},
    {
      showToast: false
    }
  );
};

export const getForm = async (
  id: string | number
): Promise<FormType | null> => {
  return await apiResponseMiddleware<FormType>(
    axios.get(`${API_URL}/${API_ENDPOINT}/${id}`),
    () => {},
    {
      showToast: false
    }
  );
};
