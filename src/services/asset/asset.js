import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function getAssets() {
  try {
    const response = await api.get("/asset");
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function getAssetInfo(queryParam) {
  const { assetId, name, symbol } = queryParam;
  try {
    const response = await api.get(
      `/asset/${assetId}` //?assetId=${assetId}&symbol=${symbol}&name=${name}
    );
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function searchAsset(query) {
  try {
    const response = await api.get(`/asset/?query=${query}`);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

export { getAssetInfo, getAssets };
