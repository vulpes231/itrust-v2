import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { IoShieldOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { formatCurrency, getIconBg, getIconColor } from "../../constants";
import { Link } from "react-router-dom";
import Contribute from "./Contribute";

const Retirements = ({ analytics, accts }) => {
  const [show, setShow] = useState(false);
  const [contribute, setContribute] = useState(false);
  const [portfolio, setPortfolio] = useState(false);
  const [projection, setProjection] = useState(false);

  function handleShow() {
    setShow(!show);
  }
  function handleContribute() {
    setContribute(!contribute);
  }
  function handlePortfolio() {
    setPortfolio(!portfolio);
  }
  function handleProjection() {
    setProjection(!projection);
  }

  const retirementAccounts =
    accts &&
    accts.length > 0 &&
    accts.filter((acct) => acct.tag === "retirement");

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

  useEffect(() => {
    if (accts.length) {
      console.log(accts);
    }
  }, [accts]);

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
                  <i class="ri-shield-line fs-20 text-light"></i>
                </span>
                <span className="d-flex flex-column">
                  <span className="fw-bold fs-15" style={{ color: "#495057" }}>
                    Retirement Accounts
                  </span>
                  <span
                    className="fw-regular fs-15"
                    style={{ color: "#212529" }}
                  >
                    {analytics?.retireAcctLength || 0} Accounts <GoDotFill />{" "}
                    {formatCurrency(analytics?.retirementBalance || 0)}
                  </span>
                </span>
              </div>
              <div onClick={handleShow}>
                {show ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
            </div>
            <div style={{ display: show ? "block" : "none" }}>
              {retirementAccounts && retirementAccounts.length > 0 ? (
                <Row className="px-4 my-4">
                  {retirementAccounts.map((acct) => {
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
          {retirementAccounts && retirementAccounts.length > 0 && (
            <Col>
              <Col>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <span className="d-flex flex-column">
                      <span
                        className="fw-bold fs-15"
                        style={{ color: "#495057" }}
                      >
                        Contribute
                      </span>
                      <span
                        className="fw-regular fs-14"
                        style={{ color: "#212529" }}
                      >
                        Add funds to your retirement account.
                      </span>
                    </span>
                  </div>
                  <div onClick={handleContribute}>
                    {contribute ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>
                </div>
                <div style={{ display: contribute ? "block" : "none" }}>
                  <Contribute accts={accts} handleIcon={getIcon} />
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
                        Portfolio Allocation
                      </span>
                      <span
                        className="fw-regular fs-14"
                        style={{ color: "#212529" }}
                      >
                        Set up risk profile and allocation strategy.
                      </span>
                    </span>
                  </div>
                  <div onClick={handlePortfolio}>
                    {portfolio ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>
                </div>
                <div style={{ display: portfolio ? "block" : "none" }}></div>
              </Col>
              <Col>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <span className="d-flex flex-column">
                      <span
                        className="fw-bold fs-15"
                        style={{ color: "#495057" }}
                      >
                        Retirement Projection
                      </span>
                      <span
                        className="fw-regular fs-14"
                        style={{ color: "#212529" }}
                      >
                        See your projected returns in retirement
                      </span>
                    </span>
                  </div>
                  <div onClick={handleProjection}>
                    {projection ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>
                </div>
                <div style={{ display: projection ? "block" : "none" }}></div>
              </Col>
            </Col>
          )}
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Retirements;
