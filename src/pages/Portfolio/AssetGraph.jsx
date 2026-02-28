import numeral from "numeral";
import React, { useState } from "react";
import { FaArrowTrendUp, FaArrowUp } from "react-icons/fa6";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

const AssetGraph = () => {
  const [perc, setPerc] = useState(10.21);
  return (
    <Card>
      <CardBody className="px-4">
        <Row className="">
          <Col xs={8} className="d-flex flex-column gap-1">
            <span
              style={{ color: "#878A99" }}
              className="text-uppercase fw-bold fs-12"
            >
              {`total asset owned (0)`}
            </span>
            <h4 className="fs-28 fw-semibold">
              {numeral(1800).format("$0,0.00")}
            </h4>
            <p
              style={{ width: "80px" }}
              className={`${
                perc < 0
                  ? "text-danger bg-danger-subtle"
                  : "text-success bg-success-subtle"
              } px-2 py-1 rounded-1 fs-13 d-flex align-items-center justify-content-center gap-1`}
            >
              <FaArrowUp size={10} /> {perc}%
            </p>
          </Col>
          <Col className="d-flex justify-content-end">
            <FaArrowTrendUp size={25} className="text-secondary" />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default AssetGraph;
