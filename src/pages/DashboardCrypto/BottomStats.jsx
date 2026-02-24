import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { formatCurrency } from "../../constants";

const BottomStats = () => {
  return (
    <Col className="p-3 bg-light mb-3 d-flex flex-column gap-3">
      <div className="d-flex align-items-start justify-content-between px-3">
        <h5>Balances</h5>
        <Link className="btn btn-secondary text-capitalize" to={"/cash"}>
          deposit cash
        </Link>
      </div>
      <Row className="px-3">
        <Col
          style={{ border: "solid 1px #dedede" }}
          className="border-1 border-dotted p-2"
          md={4}
        >
          <div className="d-flex flex-column">
            <h3 style={{ color: "#495057" }}>{formatCurrency(1000)}</h3>
            <span
              style={{ color: "#878A99" }}
              className="text-capitalize fs-16 fw-light"
            >
              total investments
            </span>
          </div>
        </Col>
        <Col
          md={4}
          style={{ border: "solid 1px #dedede" }}
          className="border-1 border-dotted p-2"
        >
          <div className="d-flex flex-column">
            <h3 style={{ color: "#495057" }}>{formatCurrency(1000)}</h3>
            <span
              style={{ color: "#878A99" }}
              className="text-capitalize fs-16 fw-light"
            >
              total savings
            </span>
          </div>
        </Col>
        <Col
          md={4}
          style={{ border: "solid 1px #dedede" }}
          className="border-1 border-dotted p-2"
        >
          <div className="d-flex flex-column">
            <h3 style={{ color: "#495057" }}>{formatCurrency(1000)}</h3>
            <span
              style={{ color: "#878A99" }}
              className="text-capitalize fs-16 fw-light"
            >
              cash balance
            </span>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default BottomStats;
