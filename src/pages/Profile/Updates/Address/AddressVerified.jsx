import React from "react";
import { Col } from "reactstrap";
import { IoAlertCircleOutline } from "react-icons/io5";

const AddressVerified = () => {
  return (
    <Col className="d-flex align-items-start gap-2 justify-content-between bg-success-subtle p-3 rounded">
      <div className="d-flex align-items-start gap-4 text-warning">
        <IoAlertCircleOutline />
        <span>
          <h6 className="text-success fs-16 fw-medium">Address Verified</h6>
        </span>
      </div>
    </Col>
  );
};

export default AddressVerified;
