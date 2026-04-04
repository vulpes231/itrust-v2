import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import { FaEyeSlash } from "react-icons/fa";
import { formatCurrency } from "../../constants";
import { format } from "date-fns";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

import numeral from "numeral";

const TopStats = ({ walletAnalytics }) => {
  return (
    <Row className="p-3">
      <Col md={3} style={{ color: "#495057" }}>
        <div className="d-flex align-items-start justify-content-between">
          <h6
            style={{ color: "#878a99" }}
            className="text-uppercase fs-13 fw-bold"
          >
            total net worth
          </h6>
          <div className="bg-secondary-subtle px-2 rounded-1">
            <FaEyeSlash />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <span className="fs-24 fw-semibold">
            {" "}
            {walletAnalytics
              ? numeral(walletAnalytics?.totalBalance).format("$0,0.00")
              : formatCurrency(0)}
          </span>
          <span
            className={`px-3 py-1  fs-10 fw-light rounded-1 ${
              walletAnalytics?.totalProfitPercent &&
              walletAnalytics?.totalProfitPercent < 0
                ? "bg-danger-subtle text-danger"
                : "bg-success-subtle text-success"
            }`}
          >
            {walletAnalytics?.totalProfitPercent &&
            walletAnalytics?.totalProfitPercent < 0 ? (
              <IoMdArrowDropdown />
            ) : (
              <IoMdArrowDropup />
            )}
            {walletAnalytics
              ? parseFloat(walletAnalytics?.totalProfitPercent).toFixed(2)
              : parseFloat(0).toFixed(2)}
            %
          </span>
        </div>
        <span style={{ color: "#878A99" }} className="fs-12 fw-semibold">
          Updated at {`${format(Date.now(), "dd/MM/yyyy")}`}
        </span>
      </Col>
    </Row>
  );
};

export default TopStats;
