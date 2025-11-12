function getAccessToken() {
	return sessionStorage.getItem("token") || null;
}

const liveUrl = "";
const devUrl = "http://localhost:5000";

export { getAccessToken, liveUrl, devUrl };
