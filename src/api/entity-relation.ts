import { apiResponseMiddleware } from "@/middleware/api-response";
import toast from "react-hot-toast";

import { api } from "./axios-instance";

const API_ENDPOINT = "/api/EntityRelation";

export const getAllRelationEntities = async (
  parentId: number,
  { page, size, search }: { page: number; size: number; search?: string }
) => {
  return await apiResponseMiddleware<
    {
      id: number;
      name: string;
      isAccess: boolean;
    }[]
  >(
    api.get(`${API_ENDPOINT}/all/${parentId}`, {
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

export const updateRelationEntities = async (
  entityId: number,
  entitiesId: number[]
) => {
  return apiResponseMiddleware(
    api.post(`${API_ENDPOINT}/create/allByEntityId/${entityId}`, entitiesId, {
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
