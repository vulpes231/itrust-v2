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
  console.log("Service", formData);
  try {
    if (formData.method === "bank") {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formDataToSend.append(key, value);
        }
      });

      const response = await api.upload("/transaction/deposit", formDataToSend);

      return response.data;
    }

    const response = await api.create("/transaction/deposit", formData);
    return response.data;
  } catch (error) {
    throw new Error(error || "Failed to initiate deposit.");
  }
}

async function withdrawFund(formData) {
  try {
    const response = await api.create("/transaction/withdraw", formData);
    return response.data;
  } catch (error) {
    const errMsg = error || "Failed to initiate wthdrawal.";
    throw new Error(errMsg);
  }
}

async function transferFund(formData) {
  try {
    const response = await api.create("/transaction/transfer", formData);
    return response.data;
  } catch (error) {
    const errMsg = error || "Transfer failed.";
    throw new Error(errMsg);
  }
}

async function connectWallet(formData) {
  try {
    const response = await api.update("/user/connect-wallet", formData);
    return response.data;
  } catch (error) {
    // console.log(error);
    const errMsg = error.message;
    throw new Error(errMsg);
  }
}
async function disconnectWallet(formData) {
  try {
    const response = await api.update("/user/disconnect-wallet", formData);
    return response.data;
  } catch (error) {
    // console.log(error);
    const errMsg = error.message;
    throw new Error(errMsg);
  }
}

export {
  getTransactions,
  getTransactionAnalytics,
  depositFunds,
  withdrawFund,
  transferFund,
  connectWallet,
  disconnectWallet,
};
