import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

export async function getDashboardChartData(formData) {
  const { timeframe } = formData;
  try {
    const res = await api.get(`/chart/dashboard/${timeframe}`);

    return res.data;
  } catch (error) {
    const errMsg = error || "Unable to fetch auto plans";
    throw new Error(errMsg);
  }
}

export async function getPortfolioChartData(formData) {
  const { timeframe, walletId } = formData;

  if (!walletId) return [];
  // console.log(walletId);
  try {
    const res =
      walletId === "default"
        ? await api.get(`/chart/portfolio/all/?timeframe=${timeframe}`)
        : await api.get(`/chart/portfolio/${walletId}/?timeframe=${timeframe}`);

    return res.data;
  } catch (error) {
    const errMsg = error || "Unable to fetch auto plans";
    throw new Error(errMsg);
  }
}
