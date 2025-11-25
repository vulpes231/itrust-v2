import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function getUserWallets() {
  try {
    const response = await api.get("/wallet");

    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function getWalletAnalytics() {
  try {
    const response = await api.get("/wallet/analytics");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

export { getUserWallets, getWalletAnalytics };
