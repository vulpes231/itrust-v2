import React from "react";
import { Col } from "reactstrap";
import { IoAlertCircleOutline } from "react-icons/io5";

const Finc = () => {
  return (
    <Col className="d-flex align-items-start gap-2 justify-content-between bg-primary-subtle p-3 rounded">
      <div className="d-flex align-items-start gap-4 text-primary">
        <IoAlertCircleOutline />
        <span>
          <span className="fs-13 fw-light">
            Financial information is required by regulatory bodies (FINRA, SEC)
            and helps us provide you with appropriate investment <br />
            recommendations. This information is kept confidential and secure.
          </span>
        </span>
      </div>
    </Col>
  );
};

export default Finc;
