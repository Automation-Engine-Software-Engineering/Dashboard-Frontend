import { apiResponseMiddleware } from "@/middleware/api-response";
import toast from "react-hot-toast";

import { EntityType } from "@/types/form/entity";

import { api } from "./axios-instance";

const API_ENDPOINT = "/api/Entity";

export const getAllEntities = async ({
  size,
  page,
  search
}: {
  size: number;
  page: number;
  search?: string;
}) => {
  return await apiResponseMiddleware<EntityType[]>(
    api.get(`${API_ENDPOINT}/all`, {
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
    api.post(`${API_ENDPOINT}/create`, entity),
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
    api.post(`${API_ENDPOINT}/update`, entity),
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
    api.post(`${API_ENDPOINT}/remove`, null, {
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
