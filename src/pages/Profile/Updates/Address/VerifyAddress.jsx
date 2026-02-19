import React from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import { IoAlertCircleOutline } from "react-icons/io5";

const VerifyAddress = () => {
  return (
    <Col className="d-flex align-items-start gap-2 justify-content-between bg-danger-subtle p-3 rounded">
      <div className="d-flex align-items-start gap-4 text-danger">
        <IoAlertCircleOutline />
        <span>
          <h6 className="text-danger fs-16 fw-medium">
            Proof of Address Verification
          </h6>
          <span className="fs-13 fw-light">
            Upload a recent document showing your residential address to
            complete verification and unlock bank <br /> deposits. Required by
            federal regulation (KYC/AML compliance)
          </span>
        </span>
      </div>
      <span>
        <Link className="btn btn-danger">Click here to Upload</Link>
      </span>
    </Col>
  );
};

export default VerifyAddress;
