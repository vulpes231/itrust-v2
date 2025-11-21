import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function registerUser(formData) {
  try {
    const response = await api.create("/signup", formData);
    console.log(response.data.token);
    return { data: response.data.data, token: response.data.token };
  } catch (error) {
    const errMsg = error?.message;
    throw new Error(errMsg);
  }
}

export { registerUser };
