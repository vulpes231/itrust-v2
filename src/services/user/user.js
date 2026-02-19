import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function getUserInfo() {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    const errMsg = error;
    throw new Error(errMsg);
  }
}

async function getUserSettings() {
  try {
    const response = await api.get("/user/settings");
    return response.data;
  } catch (error) {
    const errMsg = error;
    throw new Error(errMsg);
  }
}

async function updateUserInfo(formData) {
  try {
    const response = await api.update("/user", formData);
    return response.data;
  } catch (error) {
    // console.log(error);
    const errMsg = error.message;
    throw new Error(errMsg);
  }
}

async function updateTrustedContact(formData) {
  try {
    const response = await api.update("/user/beneficiary", formData);
    return response.data;
  } catch (error) {
    const errMsg = error;
    throw new Error(errMsg);
  }
}

async function updatePassword(formData) {
  try {
    const response = await api.create("/user/change-password", formData);
    return response.data;
  } catch (error) {
    const errMsg = error;
    throw new Error(errMsg);
  }
}

async function updateTwoFactor(formData) {
  try {
    const response = await api.create("/user/twofactor", formData);
    return response.data;
  } catch (error) {
    const errMsg = error;
    throw new Error(errMsg);
  }
}

export {
  getUserInfo,
  updateUserInfo,
  updatePassword,
  updateTwoFactor,
  getUserSettings,
  updateTrustedContact,
};
