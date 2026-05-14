import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function getUserPositions() {
  try {
    const response = await api.get("/position");

    // console.log(response.data);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.message?.data;
    throw new Error(errMsg);
  }
}

export { getUserPositions };
