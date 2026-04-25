//

import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function sendEmailVerificationCode(formData) {
  try {
    const response = await api.create("/mail/emailotp", formData);
    return response.data;
  } catch (error) {
    const errMsg = error || "Failed to resend code!.";
    throw new Error(errMsg);
  }
}

export { sendEmailVerificationCode };
