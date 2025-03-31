import { apiResponseMiddleware } from "@/middleware/api-response";

import { apiProfile } from "./axios-instance";

const API_ENDPOINT = "/Professor";

export const updateArticleWithUrl = async (data: {
  input: string;
  userId: number;
}) => {
  return await apiResponseMiddleware<unknown>(
    apiProfile.post(`${API_ENDPOINT}/UpdateArticlesWithScholarUrl`, null, {
      params: {
        ...data
      }
    }),
    () => {},
    {
      showToast: false
    }
  );
};

export const updateArticleWithScholarUrl = async (data: {
  input: string;
  userId: number;
}) => {
  return await apiResponseMiddleware<unknown>(
    apiProfile.post(
      `${API_ENDPOINT}/UpdateArticlesWithArticleScholarUrl`,
      null,
      {
        params: {
          ...data
        }
      }
    ),
    () => {},
    {
      showToast: false
    }
  );
};

export const updateArticleAuto = async (userId: number) => {
  return await apiResponseMiddleware<unknown>(
    apiProfile.post(`${API_ENDPOINT}/UpdateAtuoScholarArticls`, null, {
      params: {
        userId
      }
    }),
    () => {},
    {
      showToast: false
    }
  );
};
