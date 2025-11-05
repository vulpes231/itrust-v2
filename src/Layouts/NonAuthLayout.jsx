import React, { useEffect } from "react";
// withRouter

//redux
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import withRouter from "../Components/Common/withRouter";

const NonAuthLayout = ({ children }) => {
	const nonauthData = createSelector(
		(state) => state.Layout,
		(layoutModeType) => layoutModeType.layoutModeType
	);
	// Inside your component
	const layoutModeType = useSelector(nonauthData);

	useEffect(() => {
		if (layoutModeType === "dark") {
			document.body.setAttribute("data-bs-theme", "dark");
		} else {
			document.body.setAttribute("data-bs-theme", "light");
		}
		return () => {
			document.body.removeAttribute("data-bs-theme");
		};
	}, [layoutModeType]);
	return <div>{children}</div>;
};

export default withRouter(NonAuthLayout);
