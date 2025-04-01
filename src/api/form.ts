import { apiResponseMiddleware } from "@/middleware/api-response";
import toast from "react-hot-toast";

import { FormType } from "@/types/form/form";

import { api } from "./axios-instance";

const API_ENDPOINT = "/api/Form";

export const getAllForms = async ({
  page,
  size
}: {
  page: number;
  size: number;
}) =>
  await apiResponseMiddleware<FormType[]>(
    api.get(`${API_ENDPOINT}/all`, {
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
    api.get(`${API_ENDPOINT}/${id}`),
    () => {},
    {
      showToast: false
    }
  );

  return response?.data;
};

export const createForm = async (form: FormData) => {
  return await apiResponseMiddleware<FormType>(
    api.post(`${API_ENDPOINT}/create`, form),
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
    api.post(`${API_ENDPOINT}/${form.get("id")}/update`, form),
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
    api.post(`${API_ENDPOINT}/remove`, JSON.stringify(formId), {
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
    api.post(
      `${API_ENDPOINT}/${formId}/insertHtmlContent`,
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

export const updateFormEntities = async (
  formId: number,
  entities: number[]
) => {
  return await apiResponseMiddleware(
    api.post(`${API_ENDPOINT}/entities`, entities, {
      params: {
        formId
      }
    }),
    () => {
      toast.success("جداول با موفقیت ثبت شد", {
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
    api.post(`${API_ENDPOINT}/uploadImage`, data),
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

export const getFormPreview = async (formId: number) => {
  return await apiResponseMiddleware<string>(
    api.post(`${API_ENDPOINT}/preview`, null, {
      params: {
        formId
      }
    }),
    () => {},
    { showToast: false }
  );
};

export const getFormPreviewByWorkflowUser = async (
  workflowUserId: number,
  tableSearch:
    | {
        id: string;
        searchElement: string;
        searchValue: string;
      }[]
    | null = null,
  tablePagination: { id: string; pageNumber: string }[] | null = null
) => {
  return await apiResponseMiddleware<string>(
    api.post(
      `${API_ENDPOINT}/previewByWorkflowUserId`,
      {
        tableSearches: tableSearch,
        tablePagination
      },
      {
        params: {
          workflowUserId
        }
      }
    ),
    () => {},
    { showToast: false }
  );
};

export const saveFormData = async (
  workflowUserId: number,
  data: { id: number; content: string }[]
) => {
  return await apiResponseMiddleware(
    api.post(`${API_ENDPOINT}/saveFormData`, data, {
      params: {
        workflowUserId
      },
      headers: {
        "Content-Type": "application/json"
      }
    }),
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
