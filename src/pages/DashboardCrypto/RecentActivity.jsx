import React from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import FeatherIcon from "feather-icons-react";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/user/transactions";
import { capitalize } from "lodash";
import { formatCurrency } from "../../constants";
import { format } from "date-fns";
import { GoArrowRight } from "react-icons/go";
import numeral from "numeral";
import { GoClock } from "react-icons/go";
import { MdOutlineCancel, MdOutlineCheckCircle } from "react-icons/md";

const RecentActivity = () => {
  const queryData = { limit: 7 };
  const { data: trnxs } = useQuery({
    queryKey: ["recent"],
    queryFn: () => getTransactions(),
  });

  const filteredtrnxs = trnxs && trnxs.length && trnxs.slice(0, 5);

  // console.log(filteredtrnxs);
  return (
    <React.Fragment>
      <Col>
        <Card className="card-height-100">
          <CardHeader className="card-header align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Recent Transactions</h4>
          </CardHeader>
          <CardBody className="p-0">
            {/* <SimpleBar style={{ height: "390px" }}> */}
            <div className="p-3">
              {filteredtrnxs && filteredtrnxs.length > 0 ? (
                filteredtrnxs.map((trx) => {
                  return (
                    <div
                      key={trx._id}
                      className="d-flex align-items-start mb-3"
                    >
                      <div
                        className={`${
                          trx.type === "deposit"
                            ? "bg-success-subtle"
                            : trx.type === "transfer"
                              ? "bg-warning-subtle"
                              : trx.type === "withdrawal"
                                ? "bg-danger-subtle"
                                : "bg-info-subtle"
                        } bg-success-subtle rounded-circle d-flex align-items-center justify-content-center`}
                        style={{ width: "30px", height: "30px" }}
                      >
                        {trx.type === "deposit" ? (
                          <i class="ri-arrow-left-down-fill text-success fs-18"></i>
                        ) : trx.type === "transfer" ? (
                          <FeatherIcon
                            icon="send"
                            className="text-warning"
                            style={{ height: "14px" }}
                          />
                        ) : trx.type === "withdraw" ? (
                          <i class="ri-arrow-right-up-fill text-danger fs-18"></i>
                        ) : (
                          <i class="ri-exchange-line text-info fs-18"></i>
                        )}{" "}
                      </div>

                      <div className="flex-grow-1 ms-3">
                        <h6 className="fs-15 mb-1 d-flex align-items-center gap-2">
                          <span>
                            {" "}
                            {trx.type === "deposit"
                              ? `Deposit`
                              : trx.type === "transfer"
                                ? `Transfer`
                                : trx.type === "withdraw"
                                  ? `Withdraw`
                                  : "Savings"}
                          </span>
                          <span
                            className={`fs-10 px-2 py-1 rounded-1 text-capitalize d-flex align-items-center gap-1 ${
                              trx.status === "processed"
                                ? `bg-success-subtle text-success`
                                : trx.status === "pending"
                                  ? `bg-warning-subtle text-warning`
                                  : trx.status === "cancelled"
                                    ? `bg-danger-subtle text-danger`
                                    : null
                            }`}
                          >
                            {trx.status === "processed" ? (
                              <MdOutlineCheckCircle />
                            ) : trx.status === "pending" ? (
                              <GoClock />
                            ) : trx.status === "cancelled" ? (
                              <MdOutlineCancel />
                            ) : null}
                            {trx.status}
                          </span>
                        </h6>
                        <p className=" fs-13 mb-0 d-flex align-items-center gap-2 text-muted">
                          <span
                            style={{ whiteSpace: "nowrap" }}
                            className="fw-normal fs-10"
                          >
                            {" "}
                            {trx.method.mode === "BTC"
                              ? "Bitcoin"
                              : trx.method.mode === "USDT"
                                ? "USDT"
                                : trx.method.mode === "ETH"
                                  ? "Ethereum"
                                  : capitalize(trx?.method?.mode)}
                          </span>
                          <span>
                            <GoArrowRight />
                          </span>
                          <span
                            style={{ whiteSpace: "nowrap" }}
                            className="fw-normal fs-10 text-capitalize"
                          >
                            {trx?.account}
                          </span>
                        </p>
                        <span className="text-muted fs-11">
                          {trx.createdAt
                            ? format(trx.createdAt, "MMM dd, yyyy")
                            : null}
                        </span>
                      </div>
                      <div className="flex-shrink-0 text-end">
                        <p
                          className={`fs-15 fw-medium mb-0  ${
                            trx.type === "deposit"
                              ? `text-success`
                              : trx.type === "transfer"
                                ? `text-warning`
                                : trx.type === "withdraw"
                                  ? `text-danger`
                                  : "text-info"
                          }`}
                        >
                          {trx.type === "deposit"
                            ? `+`
                            : trx.type === "withdraw"
                              ? `-`
                              : null}
                          {trx?.amount
                            ? numeral(trx.amount).format("$0,0.00")
                            : formatCurrency(0)}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>No records found.</div>
              )}
            </div>
            {/* </SimpleBar> */}
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RecentActivity;
