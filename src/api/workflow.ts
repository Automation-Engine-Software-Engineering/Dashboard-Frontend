import { Edge, Node } from "@xyflow/react";

import { apiResponseMiddleware } from "@/middleware/api-response";
import toast from "react-hot-toast";

import { WorkFlowNodeType } from "@/types/workflow/node";
import { WorkflowType } from "@/types/workflow/workflow";

import { api } from "./axios-instance";

const API_ENDPOINT = "/api/WorkFlow";

export const getAllWorkflows = async ({
  page,
  size
}: {
  page: number;
  size: number;
}) =>
  await apiResponseMiddleware<WorkflowType[]>(
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

export const getWorkflow = async (workflowId: number) => {
  return await apiResponseMiddleware<WorkflowType>(
    api.get(`${API_ENDPOINT}/${workflowId}`),
    () => {},
    {
      showToast: true
    }
  );
};

export const createWorkflow = async (workflow: Partial<WorkflowType>) => {
  return await apiResponseMiddleware<WorkflowType>(
    api.post(`${API_ENDPOINT}/create`, workflow),
    () => {
      toast.success("گردش کار با موفقیت ساخته شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};

export const editWorkflow = async (
  workflowId: number,
  workflow: WorkflowType
) => {
  return await apiResponseMiddleware<WorkflowType>(
    api.post(`${API_ENDPOINT}/update`, {
      ...workflow,
      id: workflowId
    }),
    () => {
      toast.success("گردش کار با موفقیت ویرایش شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};

export const deleteWorkflow = async (workflowId: number) => {
  return await apiResponseMiddleware<WorkflowType>(
    api.post(`${API_ENDPOINT}/remove`, JSON.stringify(workflowId), {
      headers: {
        "Content-Type": "application/json"
      }
    }),
    () => {
      toast.success("گردش کار با موفقیت حذف شد", {
        id: "api-middleware"
      });
    },
    {
      showToast: true
    }
  );
};

export const saveWorkflowNodes = async (
  workflowId: number,
  data: { nodes: Node[]; edges: Edge[] }
) => {
  return await apiResponseMiddleware<null>(
    api.post(`${API_ENDPOINT}/setNodes`, {
      ...data,
      id: workflowId
    }),
    () => {
      toast.success("گردش کار با موفقیت ذخیره شد");
    },
    {
      showToast: true
    }
  );
};

export const getNodeStates = async (WorkFlowUserId: number) => {
  return await apiResponseMiddleware<WorkFlowNodeType>(
    api.get(`${API_ENDPOINT}/nodeState`, {
      params: {
        WorkFlowUserId
      }
    }),
    () => {
      toast.success("فرم با موفقیت تغییر کرد", {
        id: "api-middleware"
      });
    },
    {
      showToast: false
    }
  );
};

export const nodeStateMove = async (workflowUserId: number, state: number) => {
  return await apiResponseMiddleware(
    api.get(`${API_ENDPOINT}/nodeMove`, {
      params: {
        WorkflowUserId: workflowUserId,
        state
      }
    }),
    () => {},
    { showToast: true }
  );
};
