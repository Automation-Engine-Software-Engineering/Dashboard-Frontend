import { apiResponseMiddleware } from "@/middleware/api-response";
import toast from "react-hot-toast";

import { RoleType } from "@/types/role";

import { api } from "./axios-instance";

const API_ENDPOINT = "/api/Role";

export const getAllRole = async ({
  page,
  size
}: {
  page: number;
  size: number;
}) => {
  return await apiResponseMiddleware<RoleType[]>(
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
};

export const createRole = async (data: Partial<RoleType>) => {
  return await apiResponseMiddleware<RoleType>(
    api.post(`${API_ENDPOINT}/create`, data),
    () => {
      toast.success("نقش با موفقیت ایجاد شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};

export const editRole = async (data: RoleType) => {
  return await apiResponseMiddleware(
    api.post(`${API_ENDPOINT}/update`, data),
    () => {
      toast.success("نقش با موفقیت ویرایش شد");
    },
    {
      showToast: true
    }
  );
};

export const deleteRole = async (roleId: number) => {
  return apiResponseMiddleware(
    api.post(`${API_ENDPOINT}/remove`, JSON.stringify(roleId), {
      headers: {
        "Content-Type": "application/json"
      }
    }),
    () => {
      toast.success("نقش با موفقیت حذف شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};
