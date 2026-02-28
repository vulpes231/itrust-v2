import React from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import FeatherIcon from "feather-icons-react";
import { useQuery } from "@tanstack/react-query";
import { capitalize } from "lodash";
import { formatCurrency } from "../../constants";
import { format } from "date-fns";
import { GoArrowRight } from "react-icons/go";
import numeral from "numeral";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { getUserTrades } from "../../services/user/trade";

const RecentOrders = () => {
  const queryData = { limit: 7 };
  const { data: trades } = useQuery({
    queryKey: ["recentTrades"],
    queryFn: () => getUserTrades(),
  });

  const filteredTrades = trades && trades.length && trades.slice(0, 6);

  // console.log(filteredTrades);
  return (
    <React.Fragment>
      <Col>
        <Card className="card-height-100">
          <CardHeader className="card-header align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Recent Orders</h4>
          </CardHeader>
          <CardBody className="p-0">
            <div className="p-3">
              {filteredTrades && filteredTrades.length > 0 ? (
                filteredTrades.map((trade) => {
                  return (
                    <div
                      key={trade._id}
                      className="d-flex align-items-start mb-3"
                    >
                      <div
                        className={`${
                          trade.orderType === "buy"
                            ? "bg-success-subtle text-success"
                            : trade.orderType === "sell"
                            ? "bg-danger-subtle text-danger"
                            : null
                        } bg-success-subtle rounded-circle d-flex align-items-center justify-content-center`}
                        style={{ width: "30px", height: "30px" }}
                      >
                        {trade.orderType === "buy" ? (
                          <FaArrowTrendUp />
                        ) : trade.orderType === "sell" ? (
                          <FaArrowTrendDown />
                        ) : null}
                      </div>

                      <div className="flex-grow-1 ms-3">
                        <h6
                          className="fs-15 mb-1 d-flex align-items-center gap-2"
                          style={{ color: "#495057" }}
                        >
                          <span>
                            {" "}
                            {trade.orderType === "buy"
                              ? `Buy`
                              : trade.orderType === "sell"
                              ? `Sell`
                              : null}
                          </span>
                          <span
                            className={`fs-10 px-2 py-1 rounded-1 text-capitalize d-flex align-items-center gap-1 ${
                              trade.status === "open"
                                ? `bg-success text-light`
                                : trade.status === "close"
                                ? `bg-danger text-light`
                                : null
                            }`}
                          >
                            {trade.status}
                          </span>
                        </h6>
                        <p
                          style={{ color: "#495057" }}
                          className=" fs-13 mb-0 d-flex align-items-center gap-2 "
                        >
                          <span className="fw-normal fs-12">
                            {trade.asset.symbol}
                          </span>
                          <span>
                            <GoArrowRight />
                          </span>
                          <span className="fw-normal fs-12">
                            {" "}
                            {capitalize(trade.wallet.name)}
                          </span>
                        </p>
                        <span className="text-muted fs-11">
                          {trade.createdAt
                            ? format(trade.createdAt, "MMM dd, yyyy")
                            : null}
                        </span>
                      </div>
                      <div className="flex-shrink-0 text-end">
                        <p className={`fs-15 fw-medium mb-0  `}>
                          {trade.execution.amount
                            ? numeral(trade.execution.amount).format("$0,0.00")
                            : formatCurrency(0)}
                        </p>
                        <span
                          className={`${
                            trade.orderType === "buy"
                              ? `text-success`
                              : trade.orderType === "sell"
                              ? `text-danger`
                              : null
                          } d-flex align-items-center gap-1`}
                        >
                          {trade.orderType === "buy"
                            ? `+`
                            : trade.orderType === "sell"
                            ? `-`
                            : null}
                          {numeral(trade.performance.totalReturn).format(
                            "$0,0.00"
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>You have no transaction.</div>
              )}
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RecentOrders;
