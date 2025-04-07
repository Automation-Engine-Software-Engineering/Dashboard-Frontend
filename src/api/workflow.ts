import { getToken } from "@/auth";
import { AxiosError } from "axios";

import { axiosInstance } from "./axios-instance";

const API_ENDPOINT = "/api/Role/GetWorkFlowsByRole";

export const getWorkflowsByRole = async (): Promise<any | AxiosError<any>> => {
  const token = getToken();

  const response = await axiosInstance(`${API_ENDPOINT}/${token}`);

  if (response.data.status) {
    return response.data.data;
  }
  return null;
};
