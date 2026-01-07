import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

export async function getAutoPlans() {
  try {
    const res = await api.get("/invest");
    return res.data;
  } catch (error) {
    const errMsg =
      error.response?.message?.data || "Unable to fetch auto plans";
    throw new Error(errMsg);
  }
}

export async function activatePlan(formData) {
  try {
    const res = await api.create("/invest", formData);
    return res.data;
  } catch (error) {
    const errMsg = error.response?.message?.data || "Unable to start plans";
    throw new Error(errMsg);
  }
}
