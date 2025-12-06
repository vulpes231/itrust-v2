import React from "react";
import { Toast, ToastHeader, ToastBody } from "reactstrap";

const SuccessToast = ({ successMsg, isOpen = true, onClose }) => {
  return (
    <Toast
      isOpen={isOpen}
      className="bg-success text-white"
      style={{ position: "fixed", top: "50px", right: "10px" }}
    >
      <ToastHeader
        icon="success"
        toggle={onClose}
        className="bg-success text-white"
      >
        Success
      </ToastHeader>
      <ToastBody>
        <i className="ri-checkbox-circle-fill align-middle me-2"></i>
        {successMsg}
      </ToastBody>
    </Toast>
  );
};

export default SuccessToast;
