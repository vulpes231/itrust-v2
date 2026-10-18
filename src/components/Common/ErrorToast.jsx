import React from "react";
import { Toast, ToastHeader, ToastBody } from "reactstrap";

const ErrorToast = ({ errorMsg, isOpen = true, onClose }) => {
  return (
    <div
      isOpen={isOpen}
      className="alert border-0 alert-danger"
      style={{
        position: "fixed",
        top: "100px",
        right: "10px",
        zIndex: "1500",
        maxWidth: "250px",
        width: "100%",
      }}
    >
      {errorMsg}
    </div>
  );
};

export default ErrorToast;
