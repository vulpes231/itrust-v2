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

async function getUserTrades() {
  try {
    const response = await api.get("/trade");
    return response.data;
  } catch (error) {
    const errMsg = error.response?.message?.data;
    throw new Error(errMsg);
  }
}

export { openPosition, getUserTrades };
