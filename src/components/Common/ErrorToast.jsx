import React from "react";
import { Toast, ToastHeader, ToastBody } from "reactstrap";

const ErrorToast = ({ errorMsg, isOpen = true, onClose }) => {
  return (
    <Toast
      isOpen={isOpen}
      className="bg-danger text-white"
      style={{ position: "fixed", top: "50px", right: "10px", zIndex: "1000" }}
    >
      <ToastHeader
        icon="danger"
        toggle={onClose}
        className="bg-danger text-white"
      >
        Error
      </ToastHeader>
      <ToastBody>
        <i className="ri-error-warning-fill align-middle me-2"></i>
        {errorMsg}
      </ToastBody>
    </Toast>
  );
};

export default ErrorToast;
