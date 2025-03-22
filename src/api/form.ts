import { apiResponseMiddleware } from "@/middleware/api-response";
import axios from "axios";
import toast from "react-hot-toast";

import { FormType } from "@/types/form/form";

const API_URL = import.meta.env.VITE_FORM_API_URL as string;
const API_ENDPOINT = "api/Form";

export const getAllForms = async ({
  page,
  size
}: {
  page: number;
  size: number;
}) =>
  await apiResponseMiddleware<FormType[]>(
    axios.get(`${API_URL}/${API_ENDPOINT}/all`, {
      params: {
        pageSize: size,
        pageNumber: page
      }
    }),
    () => {},
    {
      showToast: false
    }
  );

export const getForm = async (id: string | number) => {
  const response = await apiResponseMiddleware<FormType>(
    axios.get(`${API_URL}/${API_ENDPOINT}/${id}`),
    () => {},
    {
      showToast: false
    }
  );

  return response?.data;
};

export const createForm = async (form: FormData) => {
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

export const editForm = async (form: FormData) => {
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

export const uploadImage = async (data: FormData) => {
  const response = await apiResponseMiddleware<{ imageUrl: string }>(
    axios.post(`${API_URL}/${API_ENDPOINT}/uploadImage`, data),
    () => {
      toast.success("عکس با موفقیت ارسال شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );

  return response?.data;
};
