import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import { formatCurrency } from "../../constants";

const Holdings = ({ trades, analytics }) => {
  const [totalHoldings, setTotalHoldings] = useState(0);

  useEffect(() => {
    if (analytics) {
      console.log(analytics);
      setTotalHoldings(analytics.totalInvested);
    }
  }, [analytics]);

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
          {trades && trades.length === 0 && (
            <Col className="p-4">
              <span style={{ color: "#878A99" }}>You have no holdings</span>
            </Col>
          )}
          <Col className="d-flex flex-column gap-3">
            {trades &&
              trades.length > 0 &&
              trades.map((trade) => {
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
                        <span style={{ color: "#868A99" }} className="fs-13">
                          {parseFloat(trade.execution.quantity).toFixed(4)}{" "}
                          shares
                        </span>
                      </span>
                    </Col>
                    <Col className="d-flex flex-column align-items-end">
                      <h6 className="fs-15">
                        {numeral(trade.execution.amount).format("$0,0.00")}
                      </h6>
                      <div
                        className={`d-flex align-items-center gap-1 fs-12 ${
                          trade.performance.totalReturnPercent < 0
                            ? "text-danger"
                            : "text-success"
                        }`}
                      >
                        <span>
                          {" "}
                          {numeral(trade.performance.totalReturn).format(
                            "$0,0.00"
                          )}
                        </span>
                        <span>
                          {" "}
                          ({" "}
                          {parseFloat(
                            trade.performance.totalReturnPercent
                          ).toFixed(2)}
                          %)
                        </span>
                      </div>
                    </Col>
                  </Row>
                );
              })}
          </Col>
          <button className="btn w-100 btn-success mt-3">
            {formatCurrency(totalHoldings)}
          </button>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Holdings;
