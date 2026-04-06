import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

export async function getChartData() {
  try {
    const res = await api.get("/chart");
    return res.data;
  } catch (error) {
    const errMsg = error || "Unable to fetch auto plans";
    throw new Error(errMsg);
  }
}
