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

export const getAllFormEntities = async (
  formId: number,
  { page, size, search }: { page: number; size: number; search?: string }
) => {
  return await apiResponseMiddleware<
    {
      id: number;
      name: string;
      isAccess: boolean;
    }[]
  >(
    api.get(`${API_ENDPOINT}/form/all`, {
      params: {
        FormId: formId,
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

export const updateFormEntities = async (
  formId: number,
  entitiesId: number[]
) => {
  return apiResponseMiddleware(
    api.post(`${API_ENDPOINT}/create/allByFormId/${formId}`, entitiesId, {
      headers: {
        "Content-Type": "application/json"
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
