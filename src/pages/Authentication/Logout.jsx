import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import withRouter from "../../Components/Common/withRouter";
import { logoutUser } from "../../services/auth/logout";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

const Logout = (props) => {
  const [error, setError] = useState("");
  const mutation = useMutation({
    mutationFn: logoutUser,
    onError: (err) => setError(err.message),
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      const timeout = setTimeout(() => {
        mutation.reset();
        sessionStorage.clear();
        window.location.href = "/login";
      }, 1000);
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    mutation.mutate();
  }, []);

  if (error) {
    return (
      <Toast isOpen={true}>
        <ToastHeader
          icon="danger"
          toggle={() => {
            setError("");
            mutation.reset();
          }}
        >
          Error
        </ToastHeader>
        <ToastBody>{error}</ToastBody>
      </Toast>
    );
  }
  document.title = "Logout | Itrust Investments";
  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);
