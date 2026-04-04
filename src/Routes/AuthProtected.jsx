import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { setAuthorization } from "../helpers/apiHelper";
import { useProfile } from "../hooks/userHooks";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../services/auth/logout";
import ErrorToast from "../components/Common/ErrorToast";

const allowedRoutesIfNotVerified = [
  "/dashboard",
  "/cash",
  "/deposit",
  "/transfer",
  "/withdraw",
  "/profile",
  "/contact",
  "/personal",
];

const AuthProtected = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile, loading, token } = useProfile();

  const mutation = useMutation({
    mutationFn: logoutUser,
  });

  const kycStatus = userProfile?.identityVerification?.kycStatus;

  useEffect(() => {
    if (!loading) {
      if (token && userProfile) {
        setAuthorization(token);
      } else if (!token) {
        sessionStorage.clear();
        mutation.mutate();
      }
    }
  }, [loading, token, userProfile, mutation]);

  const isAuthenticated = !loading && token;
  const isKycApproved = kycStatus === "approved";

  const isRouteAllowedForUnverified = allowedRoutesIfNotVerified.includes(
    location.pathname
  );

  const shouldBlockAccess =
    isAuthenticated &&
    userProfile &&
    !isKycApproved &&
    !isRouteAllowedForUnverified;

  useEffect(() => {
    let timer;

    if (shouldBlockAccess) {
      timer = setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [shouldBlockAccess, navigate]);

  if (!loading && !token) {
    return <Navigate to="/login" replace />;
  }

  if (shouldBlockAccess) {
    return (
      <ErrorToast
        errorMsg="Profile Verification Required!"
        onClose={() => {}}
      />
    );
  }

  return <>{children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {" "}
            <Component {...props} />{" "}
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
