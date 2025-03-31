import { apiResponseMiddleware } from "@/middleware/api-response";

import { apiProfile } from "./axios-instance";

const API_ENDPOINT = "/Professor";

export const updateArticleWithUrl = async (url: string) => {
  return await apiResponseMiddleware<unknown>(
    apiProfile.post(`${API_ENDPOINT}/UpdateArticlesWithScholarUrl`, null, {
      params: {
        input: url
      }
    }),
    () => {},
    {
      showToast: false
    }
  );
};

export const updateArticleWithScholarUrl = async (url: string) => {
  return await apiResponseMiddleware<unknown>(
    apiProfile.post(
      `${API_ENDPOINT}/UpdateArticlesWithArticleScholarUrl`,
      null,
      {
        params: {
          input: url
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
