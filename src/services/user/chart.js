import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

export async function getChartData(formData) {
  const { timeframe } = formData;
  try {
    const res = await api.get(`/chart/${timeframe}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    const errMsg = error || "Unable to fetch auto plans";
    throw new Error(errMsg);
  }
}
