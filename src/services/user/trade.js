import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function openPosition(formData) {
  try {
    const response = await api.create("/trade", formData);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.message?.data;
    throw new Error(errMsg);
  }
}

async function closePosition(formData) {
  try {
    const response = await api.create("/trade/sell", formData);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.message?.data;
    throw new Error(errMsg);
  }
}

async function getUserTrades() {
  try {
    const response = await api.get("/trade");
    return response.data;
  } catch (error) {
    const errMsg = error.response?.message?.data;
    throw new Error(errMsg);
  }
}

async function searchTrades(formData) {
  const { query } = formData;
  try {
    const response = await api.get(`/trade/search/?query=${query}`);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function getTradeAnalytics() {
  try {
    const response = await api.get("/trade/analytics");
    return response.data;
  } catch (error) {
    const errMsg = error.response?.message?.data;
    throw new Error(errMsg);
  }
}

export {
  openPosition,
  getUserTrades,
  getTradeAnalytics,
  closePosition,
  searchTrades,
};
