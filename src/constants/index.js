function getAccessToken() {
	return sessionStorage.getItem("token") || null;
}

export { getAccessToken };
