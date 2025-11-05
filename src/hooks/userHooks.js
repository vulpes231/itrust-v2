import { useEffect, useState } from "react";
import { getLoggedinUser } from "../helpers/apiHelper";
import { getAccessToken } from "../constants";

const useProfile = () => {
	const userProfileSession = getLoggedinUser();
	var token = getAccessToken();
	const [loading, setLoading] = useState(userProfileSession ? false : true);
	const [userProfile, setUserProfile] = useState(
		userProfileSession ? userProfileSession : null
	);

	useEffect(() => {
		const userProfileSession = getLoggedinUser();
		var token = userProfileSession && userProfileSession["token"];
		setUserProfile(userProfileSession ? userProfileSession : null);
		setLoading(token ? false : true);
	}, []);

	return { userProfile, loading, token };
};

export { useProfile };
