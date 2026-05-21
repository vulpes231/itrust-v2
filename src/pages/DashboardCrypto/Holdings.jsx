import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import { formatCurrency, getAccessToken } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { getUserPositions } from "../../services/user/position";

const Holdings = () => {
  const tk = getAccessToken();

  const { data: positionData } = useQuery({
    queryKey: ["positionData"],
    queryFn: getUserPositions,
    enabled: !!tk,
  });

  // useEffect(() => {
  //   if (positionData) console.log(positionData);
  // }, [positionData]);

  const overall =
    positionData?.totalInvested +
    positionData?.totalExtra +
    positionData?.totalReturn;

  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="card-title mb-0 flex-grow-1">Holdings</h4>
            <span>
              <Input
                type="select"
                className="text-secondary bg-secondary-subtle"
              >
                <option value="">All</option>
              </Input>
            </span>
          </div>
        </CardHeader>
        <CardBody>
          {positionData &&
            positionData.positions &&
            positionData.positions.length === 0 && (
              <Col className="p-4">
                <span style={{ color: "#878A99" }}>You have no holdings</span>
              </Col>
            )}
          <Col className="d-flex flex-column gap-3">
            {positionData &&
              positionData.positions &&
              positionData.positions.length > 0 &&
              positionData.positions.map((trade) => {
                const value = Number(trade?.return) || 0;

                const safeValue = Math.abs(value) < 0.005 ? 0 : value;
                return (
                  <Row key={trade._id} className="border-bottom">
                    <Col className="d-flex align-items-start gap-2">
                      <figure
                        style={{ width: "30px", height: "30px" }}
                        className="rounded-circle p-1 d-flex align-items-center bg-light justify-content-center"
                      >
                        <img
                          src={trade.asset.img}
                          alt=""
                          width={25}
                          className="rounded-circle w-30 h-30"
                        />
                      </figure>
                      <span className="d-flex flex-column gap-0 lh-1">
                        <h6>{trade.asset.symbol}</h6>
                        <span
                          style={{ color: "#868A99", whiteSpace: "nowrap" }}
                          className="fs-13 d-flex gap-1"
                        >
                          <span> {parseFloat(trade.quantity).toFixed(4)}</span>
                          shares
                        </span>
                      </span>
                    </Col>
                    <Col className="d-flex flex-column align-items-end">
                      <h6 className="fs-15">
                        {numeral(trade.currentValue).format("$0,0.00")}
                      </h6>
                      <div
                        className={`d-flex align-items-center gap-1 fs-12 ${
                          trade.returnPercent < 0
                            ? "text-danger"
                            : "text-success"
                        }`}
                      >
                        <span> {numeral(safeValue).format("$0,0.00")}</span>
                        <span>
                          {" "}
                          ( {parseFloat(trade.returnPercent).toFixed(2)}
                          %)
                        </span>
                      </div>
                    </Col>
                  </Row>
                );
              })}
          </Col>
          <button className="btn w-100 btn-success mt-3">
            {numeral(overall).format("$0,0.00")}
          </button>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Holdings;
