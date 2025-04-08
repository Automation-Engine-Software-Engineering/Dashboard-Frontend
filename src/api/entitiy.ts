import { AxiosError } from "axios";

import { axiosInstance } from "./axios-instance";

const API_ENDPOINT = "/api/Entity/entity";

export const getEntity = async (
  entityId: string
): Promise<any | AxiosError<any>> => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINT}/${entityId}/value`
    );
    if (response.data.status) {
      return response.data.data;
    }

    throw new Error(response.data.message);
  } catch (err) {
    throw new Error(`getForm error: ${err}`);
  }
};
