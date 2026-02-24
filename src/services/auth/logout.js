import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function logoutUser() {
  try {
    const response = await api.create("/signout", {});

    return response.data;
  } catch (error) {
    const errMsg = error || error?.message;
    // console.log(errMsg);
    throw new Error(errMsg);
  }
}

export { logoutUser };
