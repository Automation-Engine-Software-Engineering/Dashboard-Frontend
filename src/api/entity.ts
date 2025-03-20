import { apiResponseMiddleware } from "@/middleware/api-response";
import axios from "axios";
import toast from "react-hot-toast";

import { ApiData } from "@/types/api-response";
import { EntityType } from "@/types/form/entity";

const API_URL = import.meta.env.VITE_FORM_API_URL as string;
const API_ENDPOINT = "api/Entity";

export const getAllEntities = async ({
  size,
  page,
  search
}: {
  size: number;
  page: number;
  search?: string;
}): Promise<ApiData<EntityType[]> | null> => {
  return await apiResponseMiddleware<EntityType[]>(
    axios.get(`${API_URL}/${API_ENDPOINT}/all`, {
      params: {
        pageSize: size,
        pageNumber: page,
        search
      }
    }),
    () => {},
    {
      showToast: false
    }
  );
};

export const createEntity = async (entity: Partial<EntityType>) => {
  return await apiResponseMiddleware<EntityType>(
    axios.post(`${API_URL}/${API_ENDPOINT}/create`, entity),
    () => {
      toast.success("جدول با موفقیت ساخته شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};

export const editEntity = async (entity: Partial<EntityType>) => {
  return await apiResponseMiddleware<EntityType>(
    axios.post(`${API_URL}/${API_ENDPOINT}/update`, entity),
    () => {
      toast.success("جدول با موفقیت ویرایش شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};

export const deleteEntity = async (entityId: number) => {
  return await apiResponseMiddleware<EntityType>(
    axios.post(`${API_URL}/${API_ENDPOINT}/remove`, null, {
      params: {
        entityId
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
