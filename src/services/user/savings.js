import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function getAvailableSavingsAccts() {
  try {
    const response = await api.get("/savings");
    return response.data ?? null;
  } catch (error) {
    const errMsg = error.message;
    throw new Error(errMsg);
  }
}

async function getUserSavingsHistory() {
  try {
    const response = await api.get("/savings/history");
    return response.data;
  } catch (error) {
    const errMsg = error.message;
    throw new Error(errMsg);
  }
}

async function getSavingsAnalytics() {
  try {
    const response = await api.get("/savings/analytics");
    return response.data;
  } catch (error) {
    const errMsg = error.message;
    throw new Error(errMsg);
  }
}

async function openSavings(formData) {
  try {
    const response = await api.create("/savings", formData);
    return response.data;
  } catch (error) {
    const errMsg = error || error.response?.data?.message || error.message;
    throw new Error(errMsg);
  }
}

async function fundSavings(formData) {
  try {
    const response = await api.create("/savings/contribute", formData);
    return response.data;
  } catch (error) {
    const errMsg = error.message;
    throw new Error(errMsg);
  }
}

async function cashoutSavings(formData) {
  try {
    const response = await api.create("/savings/cashout", formData);
    return response.data;
  } catch (error) {
    const errMsg = error.message;
    throw new Error(errMsg);
  }
}

export {
  getAvailableSavingsAccts,
  getUserSavingsHistory,
  fundSavings,
  cashoutSavings,
  openSavings,
  getSavingsAnalytics,
};
