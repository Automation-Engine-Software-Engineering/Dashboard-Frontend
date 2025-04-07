import { AxiosError } from "axios";

import { axiosInstance } from "./axios-instance";

const API_ENDPOINT = "/api/Form";

export const getForm = async (
  formId: string
): Promise<any | AxiosError<any>> => {
  try {
    const response = await axiosInstance.get(`${API_ENDPOINT}/${formId}`);
    if (response.data.status) {
      return response.data.data;
    }

    throw new Error(response.data.message);
  } catch (err) {
    throw new Error(`getForm error: ${err}`);
  }
};
