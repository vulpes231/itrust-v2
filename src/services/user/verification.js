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

const submitVericationRequest = async (formData, files) => {
  try {
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    files.forEach((file, index) => {
      formDataToSend.append("idImages", file);
    });

    const response = await api.upload("/kyc", formDataToSend);
    return response;
  } catch (error) {
    throw new Error(error.message || "Failed to submit verification");
  }
};

export { verifyEmail, twofactorAuth, submitVericationRequest };
