import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { setAuthorization } from "../helpers/apiHelper";
import { useProfile } from "../hooks/userHooks";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../services/auth/logout";
import ErrorToast from "../components/Common/ErrorToast";
import { allowedRoutesIfNotVerified } from "../constants";

const publicRoutes = ["/login", "/twofactor"];

const routesAllowedForIncompleteProfile = [
  "/contact",
  "/profile",
  "/personal",
  "/twofactor",
  "/verifyemail",
];

const AuthProtected = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile, loading, token } = useProfile();

  const mutation = useMutation({ mutationFn: logoutUser });

  const [showBlockToast, setShowBlockToast] = useState(false);

  const kycStatus = userProfile?.identityVerification?.kycStatus;
  const isProfileComplete = userProfile?.accountStatus?.isProfileComplete;
  const twoFaVerified = userProfile?.accountStatus?.twoFaVerified;
  const twoFaActivated = userProfile?.accountStatus?.twoFaActivated;

  const isAuthenticated = !loading && !!token;
  const isKycApproved = kycStatus === "approved";
  const needsTwoFaVerification = twoFaActivated && !twoFaVerified;
  const isOnTwoFaPage = location.pathname === "/twofactor";

  const isRouteAllowedForUnverified = allowedRoutesIfNotVerified.includes(
    location.pathname,
  );

  const shouldBlockAccess =
    isAuthenticated &&
    userProfile &&
    !isKycApproved &&
    !isRouteAllowedForUnverified &&
    !needsTwoFaVerification;

  const shouldRedirectToContact =
    !loading &&
    token &&
    userProfile &&
    !isProfileComplete &&
    !routesAllowedForIncompleteProfile.includes(location.pathname) &&
    !needsTwoFaVerification;

  useEffect(() => {
    if (shouldBlockAccess) {
      setShowBlockToast(true);

      const timer = setTimeout(() => {
        navigate("/dashboard", { replace: true });
        setShowBlockToast(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [shouldBlockAccess, navigate]);

  useEffect(() => {
    if (!loading) {
      if (token && userProfile) {
        setAuthorization(token);
      } else if (!token && !publicRoutes.includes(location.pathname)) {
        navigate("/login", { replace: true });
      }
    }
  }, [loading, token, userProfile, location.pathname, navigate]);

  // Two-factor redirects
  if (!loading && isAuthenticated && needsTwoFaVerification && !isOnTwoFaPage) {
    return <Navigate to="/twofactor" replace />;
  }

  if (!loading && isAuthenticated && !needsTwoFaVerification && isOnTwoFaPage) {
    return <Navigate to="/dashboard" replace />;
  }

  // Profile incomplete redirect
  if (shouldRedirectToContact) {
    return <Navigate to="/contact" replace />;
  }

  if (!loading && !token) {
    return <Navigate to="/login" replace />;
  }

  // Show toast + children (current page) when access is blocked
  if (showBlockToast) {
    return (
      <>
        <ErrorToast errorMsg="Profile Verification Required!" />
        {children}
      </>
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
