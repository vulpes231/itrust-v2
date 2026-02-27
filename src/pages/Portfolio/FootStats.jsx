import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { formatCurrency } from "../../constants";
import numeral from "numeral";

const FootStats = ({ activeWallet }) => {
  return (
    <Col className="p-3 bg-light-subtle mb-3 d-flex flex-column gap-3">
      <Row className="px-3">
        <Col
          style={{ border: "solid 1px #dedede" }}
          className="border-1 border-dotted p-2"
          md={3}
        >
          <div className="d-flex flex-column">
            <h3 style={{ color: "#495057" }}>{formatCurrency(0)}</h3>
            <span
              style={{ color: "#878A99" }}
              className="text-capitalize fs-16 fw-light"
            >
              total investments
            </span>
          </div>
        </Col>
        <Col
          md={3}
          style={{ border: "solid 1px #dedede" }}
          className="border-1 border-dotted p-2"
        >
          <div className="d-flex flex-column">
            <h3 style={{ color: "#495057" }}>
              {" "}
              {activeWallet?.dailyProfit
                ? formatCurrency(activeWallet.dailyProfit)
                : formatCurrency(0)}
            </h3>
            <span
              style={{ color: "#878A99" }}
              className="text-capitalize fs-16 fw-light"
            >
              P&amp;L
            </span>
          </div>
        </Col>
        <Col
          md={3}
          style={{ border: "solid 1px #dedede" }}
          className="border-1 border-dotted p-2"
        >
          <div className="d-flex flex-column">
            <h3 style={{ color: "#495057" }}>
              {" "}
              {activeWallet?.availableBalance
                ? formatCurrency(activeWallet.availableBalance)
                : formatCurrency(0)}
            </h3>
            <span
              style={{ color: "#878A99" }}
              className="text-capitalize fs-16 fw-light"
            >
              uninvested cash
            </span>
          </div>
        </Col>
        <Col
          md={3}
          style={{ border: "solid 1px #dedede" }}
          className="border-1 border-dotted p-2"
        >
          <div className="d-flex flex-column">
            <h3 style={{ color: "#495057" }}>
              {" "}
              {activeWallet?.totalBalance
                ? formatCurrency(activeWallet.totalBalance)
                : formatCurrency(0)}
            </h3>
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

export default FootStats;
