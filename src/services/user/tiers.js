import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

export const getAvailableTiers = async () => {
  try {
    const response = await api.get("/tier");
    return response.data;
  } catch (error) {
    const errMsg = error;
    throw new Error(errMsg);
  }
};

export const sendTierCode = async (formData) => {
  try {
    const response = await api.update("/tier", formData);
    return response.data;
  } catch (error) {
    const errMsg = error;
    throw new Error(errMsg);
  }
};
