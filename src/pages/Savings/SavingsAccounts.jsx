import React, { useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { formatCurrency, getIconBg, getIconColor } from "../../constants";
import { GiReceiveMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import AddFunds from "./AddFunds";

const SavingsAccounts = ({ analytics, accts }) => {
  const [show, setShow] = useState(false);
  const [fund, setFund] = useState(false);
  const [goals, setGoals] = useState(false);

  const savingsAccts =
    accts && accts.length > 0 && accts.filter((acct) => acct.tag === "savings");

  const getIcon = (name) => {
    switch (name) {
      case "Traditional IRA":
        return (
          <i style={{ color: "#261CB6" }} className="ri-shield-line fs-22"></i>
        );
      case "Health Savings":
        return (
          <i style={{ color: "#F17171" }} className="ri-service-line fs-22"></i>
        );

      default:
        return null;
    }
  };

  function handleShow() {
    setShow(!show);
  }
  function handleFund() {
    setFund(!fund);
  }
  function handleGoals() {
    setGoals(!goals);
  }
  return (
    <React.Fragment>
      <Col className="">
        <Card className="py-3 px-4 d-flex flex-column gap-4">
          <Col>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <span
                  className="p-1 d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "#5156be",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                  }}
                >
                  <i class="ri-hand-coin-line fs-20 text-light"></i>
                  {/* <GiReceiveMoney className="text-light" size={20} /> */}
                </span>
                <span className="d-flex flex-column">
                  <span className="fw-bold fs-15" style={{ color: "#495057" }}>
                    Savings Accounts
                  </span>
                  <span
                    className="fw-regular fs-15"
                    style={{ color: "#212529" }}
                  >
                    {analytics?.savingAcctLength || 0} Accounts <GoDotFill />{" "}
                    {formatCurrency(analytics?.savingBalance || 0)}
                  </span>
                </span>
              </div>
              <div onClick={handleShow}>
                {show ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
            </div>

            <div style={{ display: show ? "block" : "none" }}>
              {savingsAccts && savingsAccts.length > 0 ? (
                <Row className="px-4 my-4">
                  {savingsAccts.map((acct) => {
                    return (
                      <Col lg={6} key={acct._id} className="">
                        <div className="d-flex align-items-end justify-content-between shadow py-2 px-3 rounded">
                          <span className="d-flex align-items-center gap-3">
                            <span
                              style={{ backgroundColor: getIconBg(acct.name) }}
                              className=" px-1 rounded d-flex align-items-center justify-content-center"
                            >
                              {getIcon(acct.name)}
                            </span>
                            <span className="d-flex flex-column">
                              <span
                                style={{ color: "#878A99" }}
                                className="fw-bold fs-13"
                              >
                                {acct.name}
                              </span>
                              <span
                                style={{ color: "#495057" }}
                                className="fw-semibold fs-21"
                              >
                                {formatCurrency(acct.analytics.balance)}
                              </span>
                            </span>
                          </span>
                          <span
                            style={{ color: "#3AB67A" }}
                            className="fw-semibold fs-9 bg-success-subtle py-1 px-2 rounded"
                          >
                            {acct.analytics.dailyChange}%
                          </span>
                        </div>
                        <div className="d-flex flex-column gap-2 mt-4">
                          <span className="d-flex align-items-center justify-content-between gap-4">
                            <span className="fs-14 fw-semibold">
                              Estimated Monthly Interest
                            </span>
                            <span
                              className="fs-14 fw-semibold"
                              style={{ color: "#3AB67A" }}
                            >
                              {acct.rate}%
                            </span>
                          </span>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              ) : (
                <div className="d-flex align-items-center justify-content-center flex-column gap-2 p-4">
                  <span className="fw-bold fs-16" style={{ color: "#495057" }}>
                    No Accounts Found
                  </span>
                  <span
                    className="fw-regular fs-14"
                    style={{ color: "#878A99" }}
                  >
                    Open a new account and start building your retirement
                    portfolio
                  </span>
                  <Link to={"/open-account"} className="btn btn-primary">
                    Open an Account
                  </Link>
                </div>
              )}
            </div>
          </Col>

          {savingsAccts && savingsAccts.length > 0 && (
            <Col>
              <Col>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <span className="d-flex flex-column">
                      <span
                        className="fw-bold fs-15"
                        style={{ color: "#495057" }}
                      >
                        Add Funds
                      </span>
                      <span
                        className="fw-regular fs-14"
                        style={{ color: "#212529" }}
                      >
                        Add funds to your savings account.
                      </span>
                    </span>
                  </div>
                  <div onClick={handleFund}>
                    {fund ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>
                </div>
                <div style={{ display: fund ? "block" : "none" }}>
                  <AddFunds accts={accts} handleIcon={getIcon} />
                </div>
              </Col>
              <Col>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <span className="d-flex flex-column">
                      <span
                        className="fw-bold fs-15"
                        style={{ color: "#495057" }}
                      >
                        Saving Goals
                      </span>
                      <span
                        className="fw-regular fs-14"
                        style={{ color: "#212529" }}
                      >
                        Create track and achieve your financial goals.
                      </span>
                    </span>
                  </div>
                  <div onClick={handleGoals}>
                    {goals ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>
                </div>
                <div style={{ display: goals ? "block" : "none" }}></div>
              </Col>
            </Col>
          )}
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default SavingsAccounts;
