import { getToken } from "@/auth";
import { AxiosError } from "axios";

import { axiosInstance } from "./axios-instance";

export const getWorkflowsByRole = async (): Promise<any | AxiosError<any>> => {
  const API_ENDPOINT = "/api/Role/GetWorkFlowsByRole";

  const token = getToken();

  const response = await axiosInstance(`${API_ENDPOINT}/${token}`);

  if (response.data.status) {
    return response.data.data;
  }
  return null;
};

export const getWorkflowValue = async (
  userId: string,
  workFlowId: number
): Promise<any | AxiosError<any>> => {
  try {
    const response = await axiosInstance.get(
      `api/WorkFlow/${workFlowId}/value?userId=${userId}`
    );

    if (!response.data.status) throw new Error(response.data.message);

    return response.data.data;
  } catch (err) {
    throw new Error(`create workflow user error: ${err}`);
  }
};

export const getNextWorkflowValue = async (
  userId: string,
  workFlowId: number
): Promise<any | AxiosError<any>> => {
  try {
    const response = await axiosInstance.get(
      `api/WorkFlow/${workFlowId}/next/value?userId=${userId}`
    );

    if (!response.data.status) throw new Error(response.data.message);

    return response.data.data;
  } catch (err) {
    throw new Error(`create workflow user error: ${err}`);
  }
};
