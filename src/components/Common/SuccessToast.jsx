import React from "react";
import { Toast, ToastHeader, ToastBody } from "reactstrap";

const SuccessToast = ({ successMsg, isOpen = true, onClose, isTwoFa }) => {
  return (
    <div
      isOpen={isOpen}
      className={`alert border-0 alert-success`}
      style={{ position: "fixed", top: "100px", right: "10px", zIndex: "1500" }}
    >
      {successMsg}
    </div>
  );
};

export default SuccessToast;

// ${isTwoFa ? "alert-success" : "alert-danger"}
