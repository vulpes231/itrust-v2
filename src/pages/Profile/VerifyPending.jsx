import React from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { Col } from "reactstrap";

const VerifyPending = () => {
  return (
    <Col className="d-flex align-items-start gap-2 justify-content-between bg-warning-subtle p-3 rounded">
      <div
        style={{ color: "#D9AA40" }}
        className="d-flex align-items-start gap-4"
      >
        <IoAlertCircleOutline />
        <span>
          <h6 style={{ color: "#D9AA40" }} className="fs-16 fw-medium">
            Identity Document Submitted
          </h6>
          <span className="fs-13 fw-light">
            Your document is being reviewed. Most verifications are completed
            within 24 hours and you'll receive an email notification
          </span>
        </span>
      </div>
    </Col>
  );
};

export default VerifyPending;
