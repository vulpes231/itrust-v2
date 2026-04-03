import React from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import { IoAlertCircleOutline } from "react-icons/io5";

const VerifyCard = ({ showVerify, setShowVerify }) => {
  return (
    <Col className="d-flex align-items-start gap-2 justify-content-between bg-danger-subtle p-3 rounded">
      <div className="d-flex align-items-start gap-4 text-danger">
        <IoAlertCircleOutline />
        <span>
          <h6 className="text-danger fs-16 fw-medium">Verify Account</h6>
          <span className="fs-13 fw-light">
            Complete KYC verification to access potfolio and unlock full trading
            capibilities <br /> Required by federal regulation (KYC/AML
            compliance)
          </span>
        </span>
      </div>
      <span>
        <button
          onClick={() => setShowVerify(true)}
          className="btn btn-danger text-capitalize"
        >
          verify account
        </button>
      </span>
    </Col>
  );
};

export default VerifyCard;
