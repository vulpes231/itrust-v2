import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function verifyEmail(formData) {
  try {
    const response = await api.create("/code/mail", formData);
    return response.data;
  } catch (error) {
    const errMsg = error || "Failed to submit code!.";
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

    if (files.mainFile) {
      formDataToSend.append("idImages", files.mainFile);
    }

    if (files.backFile) {
      formDataToSend.append("idImages", files.backFile);
    }

    const response = await api.upload("/kyc", formDataToSend);
    return response;
  } catch (error) {
    throw new Error(error || "Failed to submit verification");
  }
};

const submitAddressVericationRequest = async (formData, files) => {
  try {
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (files.addressFile) {
      formDataToSend.append("proof", files.addressFile);
    }

    const response = await api.upload("/kyc/address-proof", formDataToSend);
    return response;
  } catch (error) {
    throw new Error(error || "Failed to submit address verification");
  }
};

export {
  verifyEmail,
  twofactorAuth,
  submitVericationRequest,
  submitAddressVericationRequest,
};
