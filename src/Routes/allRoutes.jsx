import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import DashboardCrypto from "../pages/DashboardCrypto";

// import Basic404 from "../pages/AuthenticationInner/Errors/Basic404";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
// import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

// User Profile
import UserProfile from "../pages/Authentication/UserProfile";

const authProtectedRoutes = [
	{ path: "/dashboard", component: <DashboardCrypto /> },
	{ path: "/index", component: <DashboardCrypto /> },

	//User Profile
	{ path: "/profile", component: <UserProfile /> },

	// this route should be at the end of all other routes
	// eslint-disable-next-line react/display-name
	{
		path: "/",
		exact: true,
		component: <Navigate to="/dashboard" />,
	},
	{ path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
	// Authentication Page
	{ path: "/logout", component: <Logout /> },
	{ path: "/login", component: <Login /> },
	{ path: "/forgot-password", component: <ForgetPasswordPage /> },
	{ path: "/register", component: <Register /> },

	// { path: "/auth-404-basic", component: <Basic404 /> },

	// { path: "/auth-offline", component: <Offlinepage /> },
];

export { authProtectedRoutes, publicRoutes };
