import React from "react";
import { Card, Col, Row } from "reactstrap";
import CountUp from "react-countup";
import { BiCoin } from "react-icons/bi";
import { GrTarget } from "react-icons/gr";
import { brief, savings } from "../../assets";
import { Link } from "react-router-dom";

const Accounts = ({ analytics }) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <Card
            className="p-4 d-flex flex-column gap-2"
            style={{ color: "#495057" }}
          >
            <div className="d-flex align-items-center gap-3">
              <img src={brief} alt="" width={40} />
              <span className="d-flex flex-column">
                <span className="fs-15 fw-bold">Retirement Accounts</span>
                <span className="fs-14 fw-regular" style={{ color: "#878A99" }}>
                  {analytics?.retireAcctLength || 0} Active
                </span>
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex flex-column gap-2">
                <div
                  style={{
                    display: "block",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontSize: "29.4px",
                      fontWeight: 600,
                      color: "#495057",
                    }}
                  >
                    ${" "}
                    <CountUp
                      start={0}
                      end={analytics?.retirementBalance || 0}
                      duration={2}
                      separator=","
                    />
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 300,
                      color: "#878A99",
                      marginLeft: "2px",
                      alignSelf: "flex-end",
                      marginBottom: "4px",
                    }}
                  >
                    .{"00"}k
                  </span>
                </div>

                <span
                  className="fs-14 fw-semibold"
                  style={{ color: "#878A99" }}
                >
                  Total Retirement Savings
                </span>
              </div>
              <div className="d-flex flex-column gap-2">
                <span className="d-flex align-items-center justify-content-between gap-4">
                  <span className="fs-14 fw-semibold">
                    2025 IRA Contributions
                  </span>
                  <span
                    className="fs-14 fw-semibold"
                    style={{ color: "#878A99" }}
                  >
                    $0 / $7500
                  </span>
                </span>
                <div
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    backgroundColor: "#EFF2F7",
                  }}
                >
                  <div
                    style={{
                      width: "1%",
                      height: "10px",
                      backgroundColor: "blue",
                      borderTopLeftRadius: "5px",
                      borderBottomLeftRadius: "5px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <Card
            className="p-4 d-flex flex-column gap-2 bg-warning-subtle"
            style={{ color: "#495057" }}
          >
            <div className="d-flex align-items-center gap-3">
              <img src={savings} alt="" width={50} />
              <span className="d-flex flex-column">
                <span className="fs-15 fw-bold">Savings Accounts</span>
                <span className="fs-14 fw-regular" style={{ color: "#878A99" }}>
                  {analytics?.savingAcctLength || 0} Active
                </span>
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex flex-column gap-2">
                <div
                  style={{
                    display: "block",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontSize: "29.4px",
                      fontWeight: 600,
                      color: "#495057",
                    }}
                  >
                    ${" "}
                    <CountUp
                      start={0}
                      end={analytics?.savingBalance || 0}
                      duration={2}
                      separator=","
                    />
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 300,
                      color: "#878A99",
                      marginLeft: "2px",
                      alignSelf: "flex-end",
                      marginBottom: "4px",
                    }}
                  >
                    .{"00"}k
                  </span>
                </div>
                <span
                  className="fs-14 fw-semibold"
                  style={{ color: "#878A99" }}
                >
                  Total Savings Balance
                </span>
              </div>
              <div className="d-flex flex-column gap-2">
                <span className="d-flex align-items-center justify-content-between gap-4">
                  <span className="fs-14 fw-semibold">Active Goals</span>
                  <span
                    className="fs-14 fw-semibold"
                    style={{ color: "#878A99" }}
                  >
                    0
                  </span>
                </span>
                <div>
                  <span>
                    <GrTarget /> Track and Achieve your Financial goals
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Col>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex flex-column gap-1">
            <span className="fs-15 fw-bold" style={{ color: "#495057" }}>
              Open a new Account
            </span>
            <span className="fs-14 fw-regular" style={{ color: "#878A99" }}>
              Start saving for retirement or build your emergency fund
            </span>
          </div>
          <div>
            <Link to={"/open-account"} className="btn btn-primary">
              Open an Account
            </Link>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default Accounts;
