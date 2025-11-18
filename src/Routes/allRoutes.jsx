import React from "react";
import { Navigate } from "react-router-dom";

import {
  DashboardCrypto,
  Login,
  Register,
  ForgetPassword,
  UserProfile,
  Logout,
  Contact,
  Personal,
} from "../pages";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardCrypto /> },
  { path: "/index", component: <DashboardCrypto /> },
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
  { path: "/forgot-password", component: <ForgetPassword /> },
  { path: "/register", component: <Register /> },
  { path: "/contact", component: <Contact /> },
  { path: "/personal", component: <Personal /> },
];

export { authProtectedRoutes, publicRoutes };
