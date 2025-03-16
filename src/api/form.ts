import { apiResponseMiddleware } from "@/middleware/api-response";
import axios from "axios";
import toast from "react-hot-toast";

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

export const createForm = async (form: Partial<FormType>) => {
  return await apiResponseMiddleware<FormType>(
    axios.post(`${API_URL}/${API_ENDPOINT}/create`, form),
    () => {
      toast.success("فرم با موفقیت ساخته شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};

export const editForm = async (form: Partial<FormType>) => {
  return await apiResponseMiddleware<FormType>(
    axios.post(`${API_URL}/${API_ENDPOINT}/update`, form),
    () => {
      toast.success("فرم با موفقیت ویرایش شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};
