import { apiResponseMiddleware } from "@/middleware/api-response";
import axios from "axios";
import toast from "react-hot-toast";

import { ApiData } from "@/types/api-response";
import { FormType } from "@/types/form/form";

const API_URL = import.meta.env.VITE_FORM_API_URL as string;
const API_ENDPOINT = "api/Form";

export const getAllForms = async (): Promise<ApiData<FormType[]> | null> => {
  const urlParams = new URLSearchParams(window.location.search);

  const pageSize = urlParams.get("size") || 10;
  const pageNumber = urlParams.get("page") || 1;

  console.log(pageSize);
  return await apiResponseMiddleware<FormType[]>(
    axios.get(`${API_URL}/${API_ENDPOINT}/all`, {
      params: {
        // formId: 1,
        pageNumber,
        pageSize
      }
    }),
    () => {},
    {
      showToast: false
    }
  );
};

export const getForm = async (
  id: string | number
): Promise<FormType | null> => {
  const response = await apiResponseMiddleware<FormType>(
    axios.get(`${API_URL}/${API_ENDPOINT}/${id}`),
    () => {},
    {
      showToast: false
    }
  );

  return response.data;
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

export const deleteForm = async (formId: number) => {
  return await apiResponseMiddleware<FormType>(
    axios.post(`${API_URL}/${API_ENDPOINT}/remove`, JSON.stringify(formId), {
      headers: {
        "Content-Type": "application/json"
      }
    }),
    () => {
      toast.success("فرم با موفقیت حذف شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};

export const insertHtmlContent = async (formId: number, content: string) => {
  return await apiResponseMiddleware<FormType>(
    axios.post(
      `${API_URL}/${API_ENDPOINT}/${formId}/insertHtmlContent`,
      JSON.stringify(content),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ),
    () => {
      toast.success("فرم با موفقیت ذخیره شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};
