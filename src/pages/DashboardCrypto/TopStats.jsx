import React from "react";
import { Col, Row } from "reactstrap";
import { FaEyeSlash } from "react-icons/fa";
import { formatCurrency } from "../../constants";
import { format } from "date-fns";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const TopStats = () => {
  return (
    <Row className="p-3">
      <Col md={3} style={{ color: "#495057" }}>
        <div className="d-flex align-items-start justify-content-between">
          <h6 className="text-uppercase fs-12">total net worth</h6>
          <div className="bg-secondary-subtle px-2 rounded-1">
            <FaEyeSlash />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <h3>{formatCurrency(450000)}</h3>
          <span className="px-3 py-1 bg-success-subtle text-success fs-10 fw-light rounded-1">
            <IoMdArrowDropup /> 24.2%
          </span>
        </div>
        <span style={{ color: "#878A99" }} className="fs-11 fw-light">
          Update at{" "}
          {`${format(Date.now(), "dd/MM/yyyy")} at ${format(
            Date.now(),
            "hh:ss a"
          )}`}
        </span>
      </Col>
    </Row>
  );
};

export default TopStats;
