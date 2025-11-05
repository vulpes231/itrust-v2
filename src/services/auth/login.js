import { APIClient } from "../../helpers/apiHelper";

const api = new APIClient();

async function loginUser(formData) {
	try {
		const response = await api.create("/login", formData);
		if (response.data.token) {
			sessionStorage.setItem("token", response.data.token);
			sessionStorage.setItem("user", response.data.data);
		}
		return response.data.data;
	} catch (error) {
		const errMsg = error.response?.message?.data;
		throw new Error(errMsg);
	}
}

export { loginUser };
