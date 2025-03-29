import { apiResponseMiddleware } from "@/middleware/api-response";
import toast from "react-hot-toast";

import { MenuItemType, MenuRoleItemType } from "@/types/menu-item";

import { api } from "./axios-instance";

const API_ENDPOINT = "/api/menuElement";

export const getAllMenuItems = async ({
  page,
  size
}: {
  page: number;
  size: number;
}) => {
  return await apiResponseMiddleware<MenuItemType[]>(
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

export const createMenuItem = async (data: Partial<MenuItemType>) => {
  return await apiResponseMiddleware<MenuItemType>(
    api.post(`${API_ENDPOINT}/create`, data),
    () => {
      toast.success("آیتم با موفقیت ایجاد شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};

export const editMenuItem = async (data: MenuItemType) => {
  return await apiResponseMiddleware(
    api.post(`${API_ENDPOINT}/update`, data),
    () => {
      toast.success("آیتم با موفقیت ویرایش شد");
    },
    {
      showToast: true
    }
  );
};

export const deleteMenuItem = async (roleId: number) => {
  return apiResponseMiddleware(
    api.post(`${API_ENDPOINT}/remove`, JSON.stringify(roleId), {
      headers: {
        "Content-Type": "application/json"
      }
    }),
    () => {
      toast.success("آیتم با موفقیت حذف شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};

export const getAllMenuRoleItems = async ({
  page,
  size
}: {
  page: number;
  size: number;
}) => {
  return await apiResponseMiddleware<MenuRoleItemType[]>(
    api.get(`${API_ENDPOINT}/all/Role`, {
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
