import React, { useEffect, useState } from "react";
import { Navigate, Route, useLocation, useNavigate } from "react-router-dom";
import { setAuthorization } from "../helpers/apiHelper";
import { useProfile } from "../hooks/userHooks";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../services/auth/logout";

const AuthProtected = (props) => {
  const [error, setError] = useState("");

  const location = useLocation();
  const { userProfile, loading, token } = useProfile();

  const mutation = useMutation({
    mutationFn: logoutUser,
    onError: (err) => setError(err.message),
  });

  const allowedRoutesIfNotVerified = [
    "/dashboard",
    "/cash",
    "/deposit",
    "/transfer",
    "/withdraw",
    "/profile",
  ];

  const kycStatus = userProfile?.identityVerification?.kycStatus;

  // console.log(kycStatus);

  useEffect(() => {
    if (userProfile && !loading && token) {
      setAuthorization(token);
    } else if (!userProfile && !loading && !token) {
      sessionStorage.clear();
      mutation.mutate();
    }
  }, [token, userProfile, loading]);

  if (!loading && token && userProfile) {
    if (
      kycStatus !== "approved" &&
      !allowedRoutesIfNotVerified.includes(location.pathname)
    ) {
      return <Navigate to={"/dashboard"} replace />;
    }
  }

  return <>{props.children}</>;
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
