import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function getUserInfo() {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function updateUserInfo(formData) {
  try {
    const response = await api.put("/user", formData);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function updatePassword(formData) {
  try {
    const response = await api.create("/user/change-password", formData);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function updateTwoFactor(formData) {
  try {
    const response = await api.create("/user/twofactor", formData);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

export { getUserInfo, updateUserInfo, updatePassword, updateTwoFactor };
