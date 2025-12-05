import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function verifyEmail(formData) {
  try {
    const response = await api.create("/code/mail", formData);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function twofactorAuth(formData) {
  try {
    const response = await api.create("/code/auth", formdata);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function resendMailCode() {
  try {
    const response = await api.get("/wallet/analytics");
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

async function submitVericationRequest(formData) {
  try {
    const response = await api.create("/kyc", formData);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

export { verifyEmail, twofactorAuth, submitVericationRequest };
