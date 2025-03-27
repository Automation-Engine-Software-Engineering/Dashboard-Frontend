import { apiResponseMiddleware } from "@/middleware/api-response";
import toast from "react-hot-toast";

import { api } from "./axios-instance";

const API_ENDPOINT = "/api/RoleUser";

export const getAllRoleUsers = async (
  roleId: number,
  { page, size, search }: { page: number; size: number; search?: string }
) => {
  return await apiResponseMiddleware<
    {
      id: number;
      name: string;
      userName: string;
      isAccess: boolean;
    }[]
  >(
    api.get(`${API_ENDPOINT}/user`, {
      params: {
        RoleId: roleId,
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

export const updateRoleUsers = async (roleId: number, userIds: number[]) => {
  return apiResponseMiddleware(
    api.post(`${API_ENDPOINT}/create/allByRoleId/${roleId}`, userIds, {
      headers: {
        "Content-Type": "application/json"
      }
    }),
    () => {
      toast.success("کاربر ها با موفقیت ذخیره شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};
