import React from "react";
import { Navigate } from "react-router-dom";

import {
  DashboardCrypto,
  Login,
  Register,
  ForgetPassword,
  Logout,
  Contact,
  Personal,
  VerifyEmail,
  Market,
  Savings,
  Portfolio,
  Wallet,
  Deposit,
  Withdraw,
  Transfer,
  OpenAccount,
  Investing,
  Profile,
  Histories,
  Landing,
  TwoFa,
} from "../pages";

import AutomatedInvesting from "../pages/Landing/Automated";
import BondInvesting from "../pages/Landing/Bond";
import CryptoInvesting from "../pages/Landing/Crypto";
import CashPage from "../pages/Landing/Cash";
import Stocks from "../pages/Landing/Stocks";
import Faq from "../pages/Landing/Faq";
import GeneralQuestions from "../pages/Landing/Faq";
import Invest from "../pages/Landing/Invest";
import About from "../pages/Landing/About";
import Articles from "../pages/Landing/Articles";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardCrypto /> },
  { path: "/index", component: <DashboardCrypto /> },
  { path: "/profile", component: <Profile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "/contact", component: <Contact /> },
  { path: "/personal", component: <Personal /> },
  { path: "/twofactor", component: <TwoFa /> },
  { path: "/trade/:assetId?", component: <Market /> },
  { path: "/savings", component: <Savings /> },
  { path: "/portfolio", component: <Portfolio /> },
  { path: "/cash", component: <Wallet /> },
  { path: "/deposit", component: <Deposit /> },
  { path: "/withdraw", component: <Withdraw /> },
  { path: "/transfer", component: <Transfer /> },
  { path: "/open-account", component: <OpenAccount /> },
  { path: "/automated-investing", component: <Investing /> },
  { path: "/history", component: <Histories /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/", component: <Landing /> },
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPassword /> },
  { path: "/register", component: <Register /> },
  { path: "/verifyemail", component: <VerifyEmail /> },
  { path: "/automated", component: <AutomatedInvesting /> },
  { path: "/bond", component: <BondInvesting /> },
  { path: "/crypto", component: <CryptoInvesting /> },
  { path: "/cash-page", component: <CashPage /> },
  { path: "/stocks", component: <Stocks /> },
  { path: "/faq", component: <GeneralQuestions /> },
  { path: "/how-to-invest", component: <Invest /> },
  { path: "/about-us", component: <About /> },
  { path: "/articles", component: <Articles /> },
];

export { authProtectedRoutes, publicRoutes };
