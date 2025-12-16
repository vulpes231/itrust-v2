import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

//Import Icons
import FeatherIcon from "feather-icons-react";

//SimpleBar
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/user/transactions";
import { capitalize, upperCase } from "lodash";
import { formatCurrency } from "../../constants";
import { format } from "date-fns";

const RecentActivity = () => {
  const queryData = { limit: 7 };
  const { data: trnxs } = useQuery({
    queryKey: ["recent"],
    queryFn: () => getTransactions(),
  });

  const filteredtrnxs = trnxs && trnxs.length && trnxs.slice(0, 6);
  return (
    <React.Fragment>
      <Col xxl={4} lg={5}>
        <Card className="card-height-100">
          <CardHeader className="card-header align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Recent Activity</h4>
            <div className="flex-shrink-0">
              <UncontrolledDropdown className="card-header-dropdown">
                <DropdownToggle
                  tag="a"
                  className="text-reset dropdown-btn"
                  role="button"
                >
                  <span className="fw-semibold text-uppercase fs-12">
                    Sort by:{" "}
                  </span>
                  <span className="text-muted">
                    Current Week<i className="mdi mdi-chevron-down ms-1"></i>
                  </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem>Today</DropdownItem>
                  <DropdownItem>Last Week</DropdownItem>
                  <DropdownItem>Last Month</DropdownItem>
                  <DropdownItem>Current Year</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <SimpleBar style={{ height: "390px" }}>
              <div className="p-3">
                {filteredtrnxs && filteredtrnxs.length > 0 ? (
                  filteredtrnxs.map((trx) => {
                    return (
                      <div
                        key={trx._id}
                        className="d-flex align-items-start mb-3"
                      >
                        <div className="avatar-xs flex-shrink-0">
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                            }}
                            className="bg-light"
                          >
                            {trx.type === "deposit" ? (
                              <i class="ri-arrow-left-down-fill icon-dual-success icon-sm"></i>
                            ) : trx.type === "transfer" ? (
                              <FeatherIcon
                                icon="send"
                                className="icon-dual-warning icon-sm"
                              />
                            ) : trx.type === "withdraw" ? (
                              <i class="ri-arrow-right-up-fill icon-dual-danger icon-sm"></i>
                            ) : null}
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="fs-15 mb-1">
                            {trx.type === "deposit"
                              ? `Deposit`
                              : trx.type === "transfer"
                              ? `Transfer`
                              : trx.type === "withdraw"
                              ? `Withdraw`
                              : null}
                          </h6>
                          <p className=" fs-13 mb-0">
                            {trx.method.mode === "btc"
                              ? "Bitcoin"
                              : trx.method.mode === "usdt"
                              ? "USDT"
                              : trx.method.mode === "eth"
                              ? "Ethereum"
                              : capitalize(trx?.method?.mode)}
                            <i className="mdi mdi-circle-medium fs-15 align-middle text-muted"></i>{" "}
                            {capitalize(trx?.account)}
                          </p>
                          <span className="text-muted">
                            {trx.createdAt
                              ? format(trx.createdAt, "MMM dd, yyyy")
                              : null}
                          </span>
                        </div>
                        <div className="flex-shrink-0 text-end">
                          <h6 className="mb-1 text-success"></h6>
                          <p
                            className={`fs-13 mb-0  ${
                              trx.type === "deposit"
                                ? `text-success`
                                : trx.type === "transfer"
                                ? `text-warning`
                                : trx.type === "withdraw"
                                ? `text-danger`
                                : null
                            }`}
                          >
                            {trx.type === "deposit"
                              ? `+`
                              : trx.type === "withdraw"
                              ? `-`
                              : null}
                            {trx?.amount
                              ? formatCurrency(trx.amount)
                              : formatCurrency(0)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>You have no transaction.</div>
                )}

                <div className="mt-3 text-center">
                  <Link to="#" className="text-muted text-decoration-underline">
                    Load More
                  </Link>
                </div>
              </div>
            </SimpleBar>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RecentActivity;
