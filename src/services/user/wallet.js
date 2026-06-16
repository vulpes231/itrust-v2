import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function getUserWallets() {
  try {
    const response = await api.get("/wallet");

    return response.data || [];
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function getWalletAnalytics() {
  try {
    const response = await api.get("/wallet/analytics");
    // console.log(response.data);
    return response.data || null;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}
async function getWalletInvestData() {
  try {
    const response = await api.get("/wallet/invest-data");
    // console.log(response.data);
    return response.data || null;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function getPortfolioAccounts() {
  try {
    const response = await api.get("/wallet/portfolio-accounts");
    // console.log(response.data);
    return response.data || null;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function getTradingAccounts() {
  try {
    const response = await api.get("/wallet/trading-accounts");
    // console.log(response.data);
    return response.data || null;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function getTotalNetworth() {
  try {
    const response = await api.get("/wallet/networth");
    // console.log(response.data);
    return response.data || null;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

export {
  getUserWallets,
  getWalletAnalytics,
  getWalletInvestData,
  getPortfolioAccounts,
  getTradingAccounts,
  getTotalNetworth,
};
