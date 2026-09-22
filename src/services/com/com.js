import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

export const sendCOMCode = async (formData) => {
  try {
    const response = await api.create(`/com/send`, formData);

    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
};

export const verifyCOMCode = async (formData) => {
  try {
    const response = await api.create(`/com/verify`, formData);

    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
};
