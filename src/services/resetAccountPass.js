//

import { APIClient } from "../helpers/apiHelper";

const api = new APIClient();

async function sendResetCode(formData) {
  try {
    const response = await api.create("/resetaccountpass/otp", formData);
    return response.data;
  } catch (error) {
    const errMsg = error || "Failed to send reset OTP!.";
    throw new Error(errMsg);
  }
}

async function confirmResetCode(formData) {
  try {
    const response = await api.put("/resetaccountpass/confirm", formData);
    return { token: response.token };
  } catch (error) {
    const errMsg = error || "Failed to confirm code!.";
    throw new Error(errMsg);
  }
}

async function changeAccountPassword(formData) {
  try {
    const response = await api.update("/resetaccountpass", formData);
    // console.log(response);
    return response.data;
  } catch (error) {
    const errMsg = error || "Failed to update password!.";
    throw new Error(errMsg);
  }
}

export { changeAccountPassword, sendResetCode, confirmResetCode };
