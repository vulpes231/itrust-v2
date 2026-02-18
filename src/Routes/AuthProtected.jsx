import React, { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { logoutUser } from "../slices/thunks";
import { setAuthorization } from "../helpers/apiHelper";
import { useProfile } from "../hooks/userHooks";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../services/auth/logout";

const AuthProtected = (props) => {
  const [error, setError] = useState("");

  const { userProfile, loading, token } = useProfile();

  const mutation = useMutation({
    mutationFn: logoutUser,
    onError: (err) => setError(err.message),
  });

  useEffect(() => {
    if (userProfile && !loading && token) {
      setAuthorization(token);
    } else if (!userProfile && !loading && !token) {
      sessionStorage.clear();
      mutation.mutate();
    }
  }, [token, userProfile, loading]);

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 1000);
      return () => clearTimeout(tmt);
    }
  }, [error]);
  /*
    Navigate is un-auth access protected routes via url
    */

  useEffect(() => {
    if (mutation.isSuccess) {
      const tmt = setTimeout(() => {
        mutation.reset();
        window.location.href = "/login";
      }, 1000);
      return () => clearTimeout(tmt);
    }
  }, [mutation.isSuccess]);

  // if (!userProfile && !token) {
  //   return (
  //     <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
  //   );
  // }

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
