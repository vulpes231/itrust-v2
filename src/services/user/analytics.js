import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function getUserChartData() {
	try {
		const response = await api.get("/chart");
		return response.data;
	} catch (error) {
		const errMsg = error.response?.data?.message;
		throw new Error(errMsg);
	}
}

export { getUserChartData };
