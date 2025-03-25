import { apiResponseMiddleware } from "@/middleware/api-response";
import toast from "react-hot-toast";

import { PropertyType } from "@/types/form/property";

import { api } from "./axios-instance";

const API_ENDPOINT = "/api/Property";

export const getEntityProperties = async (
  entityId: string | number,
  { page, size }: { size: number; page: number }
) => {
  return await apiResponseMiddleware<PropertyType[]>(
    api.get(`api/Entity/${entityId}/property`, {
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
};

export const createProperty = async (property: Partial<PropertyType>) => {
  return await apiResponseMiddleware<PropertyType>(
    api.post(`${API_ENDPOINT}/add`, property),
    () => {
      toast.success("عنصر با موفقیت ساخته شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};

export const editProperty = async (propertyId: Partial<PropertyType>) => {
  return await apiResponseMiddleware<PropertyType>(
    api.post(`${API_ENDPOINT}/update`, propertyId),
    () => {
      toast.success("عنصر با موفقیت ویرایش شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};

export const deleteProperty = async (propertyId: number) => {
  return await apiResponseMiddleware<PropertyType>(
    api.post(`${API_ENDPOINT}/remove`, null, {
      params: {
        propertyId
      }
    }),
    () => {
      toast.success("عنصر با موفقیت حذف شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};
