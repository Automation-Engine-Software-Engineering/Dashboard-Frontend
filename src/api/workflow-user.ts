import { AxiosError } from "axios";

import { axiosInstance } from "./axios-instance";

const API_ENDPOINT = "/api/WorkFlowUser/create";

export const createWorkflowUser = async (
  userId: string,
  workFlowId: number
): Promise<any | AxiosError<any>> => {
  try {
    const response = await axiosInstance.post(API_ENDPOINT, {
      id: 0,
      userId,
      workFlowId
    });
    if (!response.data.status) throw new Error(response.data.message);
  } catch (err) {
    throw new Error(`create workflow user error: ${err}`);
  }
};
