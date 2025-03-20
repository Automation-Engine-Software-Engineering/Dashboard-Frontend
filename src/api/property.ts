import { apiResponseMiddleware } from "@/middleware/api-response";
import axios from "axios";
import toast from "react-hot-toast";

import { ApiData } from "@/types/api-response";
import { PropertyType } from "@/types/form/property";

const API_URL = import.meta.env.VITE_FORM_API_URL as string;
const API_ENDPOINT = "api/Property";

export const getEntityProperties = async (
  entityId: string | number,
  { page, size }: { size: number; page: number }
): Promise<ApiData<PropertyType[]> | null> => {
  return await apiResponseMiddleware<PropertyType[]>(
    axios.get(`${API_URL}/api/Entity/${entityId}/property`, {
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
    axios.post(`${API_URL}/${API_ENDPOINT}/entity/property/add`, property),
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
    axios.post(`${API_URL}/${API_ENDPOINT}/property/update`, propertyId),
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
    axios.post(`${API_URL}/${API_ENDPOINT}/remove`, null, {
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
