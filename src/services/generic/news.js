import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

const getLatestNews = async () => {
  try {
    const url = `https://newsdata.io/api/1/latest?apikey=pub_04b183c5473d4e24b64a48d0da8e6536&q=crypto`;

    const response = await api.get(url);
    // console.log(response);
    return response.results;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
};

export { getLatestNews };
