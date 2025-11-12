function getAccessToken() {
	return sessionStorage.getItem("token") || null;
}

const liveUrl = "https://trustserver.cloud";
const devUrl = "http://localhost:5000";

export { getAccessToken, liveUrl, devUrl };
