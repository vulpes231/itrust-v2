import React from "react";
import { Col } from "reactstrap";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const AddressVerified = () => {
  return (
    <Col className="d-flex align-items-center gap-2 justify-content-between bg-success-subtle p-3 rounded">
      <div className="d-flex align-items-center gap-4 text-success">
        <RiVerifiedBadgeFill />

        <span className="text-success fs-16 fw-medium">Address Verified</span>
      </div>
    </Col>
  );
};

export default AddressVerified;
