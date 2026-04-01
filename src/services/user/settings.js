import { APIClient } from "../../helpers/apiHelper";
const api = new APIClient();

async function getSettings() {
  try {
    const response = await api.get("/settings");
    return response.data;
  } catch (error) {
    const errMsg = error;
    throw new Error(errMsg);
  }
}

async function toggleDrip() {
  try {
    const response = await api.update("/profile/drip");
    return response.data;
  } catch (error) {
    const errMsg = error || "Failed to update drip";
    throw new Error(errMsg);
  }
}

async function toggleMargin() {
  try {
    const response = await api.update("/profile/margin");
    return response.data;
  } catch (error) {
    const errMsg = error || "Failed to update margin";
    throw new Error(errMsg);
  }
}

async function toggleOptions() {
  try {
    const response = await api.update("/profile/options");
    return response.data;
  } catch (error) {
    const errMsg = error || "Failed to update options";
    throw new Error(errMsg);
  }
}

export { getSettings, toggleDrip, toggleMargin, toggleOptions };
