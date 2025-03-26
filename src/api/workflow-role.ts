import { apiResponseMiddleware } from "@/middleware/api-response";

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
