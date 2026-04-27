import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function loginUser(formData) {
  try {
    const response = await api.create("/signin", formData);

    console.log(response);

    return { user: response.data || response, token: response.token };
  } catch (error) {
    const errMsg = error || error.message;

    console.log(errMsg);
    throw new Error(errMsg);
  }
}

export { loginUser };
