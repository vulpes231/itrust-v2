import React from "react";
import { Toast, ToastHeader, ToastBody } from "reactstrap";

const TwoFaToast = ({ successMsg, isOpen = true, onClose }) => {
  return (
    <div
      isOpen={isOpen}
      className={`alert border-0 alert-danger`}
      style={{
        position: "fixed",
        top: "100px",
        right: "10px",
        zIndex: "1500",
        maxWidth: "250px",
        width: "100%",
      }}
    >
      {successMsg}
    </div>
  );
};

export default TwoFaToast;

// ${isTwoFa ? "alert-success" : "alert-danger"}
