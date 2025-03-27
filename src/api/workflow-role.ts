import { apiResponseMiddleware } from "@/middleware/api-response";
import toast from "react-hot-toast";

import { RoleWorkflowType } from "@/types/role-workflow";

import { api } from "./axios-instance";

const API_ENDPOINT = "/api/WorkFlowRole";

export const getRoleWorkflow = async () => {
  return await apiResponseMiddleware<RoleWorkflowType[]>(
    api.get(`${API_ENDPOINT}/RoleWorkflow`, {
      params: {
        pageSize: 100,
        pageNumber: 1
      }
    }),
    () => {},
    {
      showToast: false
    }
  );
};

export const getAllRoleWorkflows = async (
  workflowId: number,
  { page, size, search }: { page: number; size: number; search?: string }
) => {
  return await apiResponseMiddleware<
    {
      id: number;
      name: string;
      isAccess: boolean;
    }[]
  >(
    api.get(`${API_ENDPOINT}/Workflow/all`, {
      params: {
        WorkflowId: workflowId,
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

export const getAllWorkflowRoles = async (
  roleId: number,
  { page, size, search }: { page: number; size: number; search?: string }
) => {
  return await apiResponseMiddleware<
    {
      id: number;
      name: string;
      isAccess: boolean;
    }[]
  >(
    api.get(`${API_ENDPOINT}/role/all`, {
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

export const updateRoleWorkflows = async (
  roleId: number,
  workflowIds: number[]
) => {
  return apiResponseMiddleware(
    api.post(`${API_ENDPOINT}/create/allbyroleid/${roleId}`, workflowIds, {
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

export const updateWorkflowRoles = async (
  workflowId: number,
  roleIds: number[]
) => {
  return apiResponseMiddleware(
    api.post(`${API_ENDPOINT}/create/allbyworkflowid/${workflowId}`, roleIds, {
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
