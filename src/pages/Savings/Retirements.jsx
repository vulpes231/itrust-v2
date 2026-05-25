import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { IoShieldOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { formatCurrency, getIconBg, getIconColor } from "../../constants";
import { Link } from "react-router-dom";
import Contribute from "./Contribute";
import { upperCase } from "lodash";
import numeral from "numeral";

const Retirements = ({ analytics, accts, handleIcon }) => {
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
                  <span className="fw-bold fs-15">Retirement Accounts</span>
                  <span className="fw-regular text-muted fs-15">
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
                    // console.log(acct.analytics.contributions);
                    return (
                      <Col lg={6} key={acct._id} className="">
                        <div className="d-flex align-items-end justify-content-between shadow border-2 border py-3 px-4 rounded">
                          <span className="d-flex align-items-center gap-3">
                            <span
                              style={{ backgroundColor: getIconBg(acct.name) }}
                              className="px-1 rounded d-flex align-items-center justify-content-center"
                            >
                              {handleIcon(acct.name)}
                            </span>
                            <span className="d-flex flex-column">
                              <span className="fw-bold fs-13 text-muted text-capitalize">
                                {acct.name.includes("ira")
                                  ? `${acct.name.split(" ")[0]} ${upperCase(acct.name.split(" ")[1])}`
                                  : acct.name}
                              </span>
                              <span className="fw-semibold fs-21">
                                {formatCurrency(
                                  acct.analytics.balance.available,
                                )}
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
                            <span
                              style={{ whiteSpace: "nowrap" }}
                              className="fs-14 fw-semibold"
                            >
                              2025 IRA Contributions
                            </span>
                            <span
                              className="fs-14 fw-semibold d-flex gap-1 "
                              style={{ color: "#878A99" }}
                            >
                              <span className="fs-10">
                                {" "}
                                {numeral(acct.analytics.contributions).format(
                                  "$0,0.00",
                                )}
                              </span>
                              <span className="fs-10">/</span>
                              <span className="fs-10">
                                {" "}
                                {numeral(acct.depositLimit.max).format(
                                  "$0,0.00",
                                )}
                              </span>
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
                  <span className="fw-bold fs-16">No Accounts Found</span>
                  <span className="fw-regular fs-14 text-muted">
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
                      <span className="fw-bold fs-15">Contribute</span>
                      <span className="fw-regular text-muted fs-14">
                        Add funds to your retirement account.
                      </span>
                    </span>
                  </div>
                  <div onClick={handleContribute}>
                    {contribute ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>
                </div>
                <div style={{ display: contribute ? "block" : "none" }}>
                  <Contribute accts={accts} handleIcon={handleIcon} />
                </div>
              </Col>
              <Col>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <span className="d-flex flex-column">
                      <span className="fw-bold fs-15">
                        Portfolio Allocation
                      </span>
                      <span className="fw-regular text-muted fs-14">
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
                      <span className="fw-bold fs-15">
                        Retirement Projection
                      </span>
                      <span className="fw-regular text-muted fs-14">
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
