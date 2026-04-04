import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { formatCurrency } from "../../constants";
import numeral from "numeral";

const BottomStats = ({ walletAnalytics }) => {
  // console.log(walletAnalytics);
  return (
    <Col className="p-3 bg-light-subtle mb-3 d-flex flex-column gap-3">
      <div className="d-flex align-items-start justify-content-between px-3">
        <span style={{ color: "#495057" }} className="fs-16 fw-semibold">
          Balances
        </span>
        <Link className="btn btn-secondary text-capitalize" to={"/deposit"}>
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
            <span className="fs-17 fw-semibold" style={{ color: "#495057" }}>
              {walletAnalytics
                ? numeral(
                    Math.floor(walletAnalytics?.totalInvested * 100) / 100
                  ).format("$0,0.00")
                : formatCurrency(0)}
            </span>
            <span
              style={{ color: "#878A99" }}
              className="text-capitalize fs-14 fw-normal"
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
            <span style={{ color: "#495057" }} className="fs-17 fw-semibold">
              {formatCurrency(0)}
            </span>
            <span
              style={{ color: "#878A99" }}
              className="text-capitalize fs-14 fw-normal"
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
            <span style={{ color: "#495057" }} className="fs-17 fw-semibold">
              {walletAnalytics
                ? numeral(walletAnalytics?.cashBalance).format("$0,0.00")
                : formatCurrency(0)}
            </span>
            <span
              style={{ color: "#878A99" }}
              className="text-capitalize fs-14 fw-normal"
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
