import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function registerUser(formData) {
  try {
    const response = await api.create("/signup", formData);
    return { token: response.token };
  } catch (error) {
    console.log(error);
    const errMsg =
      error || error?.message || "Registration failed. Try again later.";
    throw new Error(errMsg);
  }
}

async function completeRegister(formData) {
  try {
    const response = await api.update("/user/complete-account", formData);
    console.log(response.data);
    return { user: response.data };
  } catch (error) {
    const errMsg = error || error?.message;
    throw new Error(errMsg);
  }
}

export { registerUser, completeRegister };
