import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function registerUser(formData) {
  try {
    const response = await api.create("/signup", formData);
    console.log(response);
    return response.data;
  } catch (error) {
    const errMsg = error?.message;
    // console.log(errMsg);
    throw new Error(errMsg);
  }
}

export { registerUser };
