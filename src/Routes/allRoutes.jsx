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
  VerifyEmail,
  Market,
  Savings,
  Portfolio,
  Wallet,
  KYCVerification,
  Deposit,
  Withdraw,
  Transfer,
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
  { path: "/contact", component: <Contact /> },
  { path: "/personal", component: <Personal /> },
  { path: "/verifyemail", component: <VerifyEmail /> },
  { path: "*", component: <Navigate to="/dashboard" /> },
  { path: "/trade", component: <Market /> },
  { path: "/savings", component: <Savings /> },
  { path: "/portfolio", component: <Portfolio /> },
  { path: "/cash", component: <Wallet /> },
  { path: "/verifyaccount", component: <KYCVerification /> },
  { path: "/deposit", component: <Deposit /> },
  { path: "/withdraw", component: <Withdraw /> },
  { path: "/transfer", component: <Transfer /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPassword /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
