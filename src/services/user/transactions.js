import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function getTransactions() {
  try {
    const response = await api.get("/transaction");
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function getTransactionAnalytics() {
  try {
    const response = await api.get("/transaction/analytics");
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function depositFunds(formData) {
  try {
    const response = await api.create("/transaction/deposit", formData);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

export { getTransactions, getTransactionAnalytics, depositFunds };
