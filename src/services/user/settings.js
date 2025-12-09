import { APIClient } from "../../helpers/apiHelper";
const api = new APIClient();

async function getSettings() {
  try {
    const response = await api.get("/settings");
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

export { getSettings };
