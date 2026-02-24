import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function getAssets(queryData) {
  const { limit, page, sortBy, type } = queryData;
  try {
    const response = await api.get(
      `/asset/?limit=${limit}&sortBy=${sortBy}&page=${page}&type=${type}`
    );

    return { data: response.data, pagination: response.pagination };
  } catch (error) {
    const errMsg = error || "Fetch assets failed.";
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
    const errMsg = error || "Fetch asset info failed";
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

export { getAssetInfo, getAssets, searchAsset };
