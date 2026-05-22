import { capitalize } from "lodash";
import React, { useState } from "react";
import { Card, Col, Label, Row } from "reactstrap";
import { cash } from "../../assets";
import { formatCurrency, liveUrl } from "../../constants";
import { GoDotFill } from "react-icons/go";
import { FaArrowUp } from "react-icons/fa";
import numeral from "numeral";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { format } from "date-fns";
import Timer from "./Timer";
import PlanOrders from "./PlanOrders";

const ActivePlans = ({ plans, style }) => {
  const [showCard, setShowCard] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  return (
    <React.Fragment>
      <Row className="g-4 p-3">
        {plans &&
          plans.length > 0 &&
          plans.map((plan) => {
            // console.log(plan);
            return (
              <Card key={plan._id}>
                <Col className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-start gap-2 ">
                    <span className="p-1 bg-light rounded-circle">
                      <img
                        src={`${liveUrl}${plan.image}`}
                        alt="plan-img"
                        width={40}
                        className="rounded-circle"
                      />
                    </span>
                    <div>
                      <h4 className="fw-bold fs-16 text-capitalize lh-1">
                        {plan.name}
                      </h4>
                      <span className="text-muted text-capitalize d-flex align-items-center gap-1">
                        <p>1 active plan</p>
                        <p>
                          <GoDotFill />
                        </p>
                        <p>
                          {numeral(plan.balance.available).format("$0,0.00")}
                        </p>
                      </span>
                    </div>
                  </div>
                  <div onClick={() => setShowCard(!showCard)}>
                    {showCard ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </div>
                </Col>
                {showCard && (
                  <Col>
                    <Col className="">
                      <hr className="text-muted" />

                      <div className="py-3 px-4">
                        <div className="d-flex flex-column gap-4 justify-content-between mb-3 flex-md-row">
                          <div>
                            <Timer start={plan.start} end={plan.end} />
                          </div>
                          <span>
                            <h4
                              style={{ fontSize: "32px" }}
                              className="fw-semibold text-success"
                            >
                              {parseFloat(
                                plan.analytics.expectedReturn,
                              ).toFixed(2)}
                              %
                            </h4>
                            <small className="text-muted">Returns</small>
                          </span>
                        </div>
                        <Row>
                          <Col xs={6} md={3}>
                            <Label className="text-muted fs-14 fw-regular">
                              Date Started
                            </Label>
                            <p className="fs-15 fw-semibold">
                              {format(plan.start, "dd MMM yyyy")}
                            </p>
                          </Col>
                          <Col xs={6} md={3}>
                            <Label className="text-muted fs-14 fw-regular">
                              Amount Invested
                            </Label>
                            <p className="fs-15 fw-semibold">
                              {numeral(plan.balance.total).format("$0,0.00")}
                            </p>
                          </Col>
                          <Col xs={6} md={3}>
                            <Label className="text-muted fs-14 fw-regular">
                              Returns
                            </Label>
                            <p className="fs-15 fw-semibold">
                              {numeral(plan.performance.totalReturn).format(
                                "$0,0.00",
                              )}
                            </p>
                          </Col>
                          <Col xs={6} md={3}>
                            <Label className="text-muted fs-14 fw-regular">
                              24h Returns
                            </Label>
                            <p className="fs-15 fw-semibold">
                              {plan.performance.dailyReturn}%
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6} md={3}>
                            <Label className="text-muted fs-14 fw-regular">
                              Win Rate
                            </Label>
                            <p className="fs-15 fw-semibold">
                              {plan.analytics.winRate}%
                            </p>
                          </Col>
                          <Col xs={6} md={3}>
                            <Label className="text-muted fs-14 fw-regular">
                              AUM(USD)
                            </Label>
                            <p className="fs-15 fw-semibold">{plan.aum}</p>
                          </Col>
                          <Col xs={6} md={3}>
                            <Label className="text-muted fs-14 fw-regular">
                              Risk Level
                            </Label>
                            <p className="fs-15 fw-semibold">
                              <span
                                className={`px-3 py-1 fw-medium fs-11 text-capitalize ${plan.risk === "moderate" ? "text-warning bg-warning-subtle" : plan.risk === "conservative" ? "text-info bg-info-subtle" : "text-danger bg-danger-subtle"}`}
                              >
                                {plan.risk}{" "}
                                <span>
                                  <MdArrowOutward />{" "}
                                </span>
                              </span>
                            </p>
                          </Col>
                          <Col xs={6} md={3}>
                            <Label className="text-muted fs-14 fw-regular">
                              End Date
                            </Label>
                            <p className="fs-15 fw-semibold">
                              {" "}
                              {format(plan.end, "dd MMM yyyy")}
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col>
                      <hr className="text-muted" />
                      <div className="px-4 py-3 d-flex justify-content-end">
                        <button
                          onClick={() => setShowOrders(!showOrders)}
                          className="btn bg-secondary-subtle text-secondary"
                        >
                          Close Orders{" "}
                          {!showOrders ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </button>
                      </div>
                      {showOrders && (
                        <div>
                          <PlanOrders
                            planId={plan.planId}
                            planName={plan.name}
                          />
                        </div>
                      )}
                    </Col>
                  </Col>
                )}
              </Card>
            );
          })}
      </Row>
    </React.Fragment>
  );
};

export default ActivePlans;
