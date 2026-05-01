import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function getUserWatchList(queryData) {
  try {
    const response = await api.get(`/watchlist`);

    return response.data;
  } catch (error) {
    const errMsg = error || "Fetch watchlist failed.";
    throw new Error(errMsg);
  }
}

async function addToWatchList(assetId) {
  try {
    const response = await api.create(`/watchlist`, { assetId });

    return response.data;
  } catch (error) {
    const errMsg = error || "Failed to add to watchlist.";
    throw new Error(errMsg);
  }
}

async function removeFromWatchList(assetId) {
  try {
    const response = await api.put(`/watchlist`, { assetId });

    return response.data;
  } catch (error) {
    const errMsg = error || "Failed to remove from watchlist.";
    throw new Error(errMsg);
  }
}

const checkWatchlistStatus = async (assetId) => {
  try {
    const response = await api.get(`watchlist/check/${assetId}`);
    return response.data;
  } catch (error) {
    console.error("Error checking watchlist:", error);
    throw error.response?.data || error.message;
  }
};

export {
  addToWatchList,
  removeFromWatchList,
  getUserWatchList,
  checkWatchlistStatus,
};
