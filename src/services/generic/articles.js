import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

export const getArticles = async () => {
  try {
    const response = await api.get("/article");

    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
};

export const getArticleInfo = async (articleId) => {
  try {
    const response = await api.get(`/article/${articleId}`);

    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
};
