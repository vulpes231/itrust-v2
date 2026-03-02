import numeral from "numeral";
import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { Card, CardBody, Col, Row } from "reactstrap";
import { getWalletAnalytics } from "../../services/user/wallet";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "../../constants";

import { FaChartLine } from "react-icons/fa6";

const AssetGraph = ({ count }) => {
  const { data: walletAnalytics, isLoading: getAnalyticsLoading } = useQuery({
    queryFn: getWalletAnalytics,
    queryKey: ["walletAnalytics"],
  });

  return (
    <Card>
      <CardBody className="px-4">
        <Row className="">
          <Col xs={8} className="d-flex flex-column gap-1">
            <span
              style={{ color: "#878A99" }}
              className="text-uppercase fw-bold fs-12"
            >
              total asset owned ({count || 0})
            </span>
            <h4 className="fs-28 fw-semibold">
              {walletAnalytics?.totalInvested
                ? numeral(walletAnalytics?.totalInvested).format("$0,0.00")
                : formatCurrency(0)}
            </h4>
            <p
              style={{ width: "80px" }}
              className={`${
                walletAnalytics?.totalProfitPercent < 0
                  ? "text-danger bg-danger-subtle"
                  : "text-success bg-success-subtle"
              } px-2 py-1 rounded-1 fs-13 d-flex align-items-center justify-content-center gap-1`}
            >
              {walletAnalytics?.totalProfitPercent > 0 ? (
                <FaArrowUp size={10} />
              ) : (
                <FaArrowDown size={10} />
              )}
              {walletAnalytics?.totalProfitPercent
                ? parseFloat(walletAnalytics?.totalProfitPercent).toFixed(2)
                : parseFloat(0).toFixed(2)}
              %
            </p>
          </Col>
          <Col className="d-flex justify-content-end">
            <FaChartLine size={25} className="text-secondary" />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default AssetGraph;
