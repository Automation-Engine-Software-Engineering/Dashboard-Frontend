import { apiResponseMiddleware } from "@/middleware/api-response";
import toast from "react-hot-toast";

import { WorkflowUserType } from "@/types/workflow-user";

import { api } from "./axios-instance";

const API_ENDPOINT = "/api/WorkFlowUser";

export const getWorkFlowUserWorkflow = async (workFlowId: number) => {
  return await apiResponseMiddleware<WorkflowUserType>(
    api.get(`${API_ENDPOINT}/workflow`, {
      params: {
        workFlowId
      }
    }),
    () => {
      toast.success("اطلاعات با موفقیت دریافت شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};

export const createWorkFlowUser = async (data: { workFlowId: number }) => {
  return await apiResponseMiddleware<WorkflowUserType>(
    api.post(`${API_ENDPOINT}/create`, data),
    () => {
      toast.success("اطلاعات با موفقیت ثبت شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};

export const removeWorkFlowUser = async (id: number) => {
  return await apiResponseMiddleware<WorkflowUserType>(
    api.post(`${API_ENDPOINT}/remove`, JSON.stringify(id), {
      headers: {
        "Content-Type": "application/json"
      }
    }),
    () => {
      toast.success("اطلاعات با موفقیت حذف شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};
