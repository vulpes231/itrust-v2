import { capitalize } from "lodash";
import React from "react";
import { Card, Col, Row } from "reactstrap";
import { cash } from "../../assets";
import { formatCurrency, liveUrl } from "../../constants";

const ActivePlans = ({ plans, style }) => {
  // console.log(plans);
  return (
    <React.Fragment>
      <Row className="g-4 py-3">
        {plans &&
          plans.length > 0 &&
          plans.map((plan) => {
            return (
              <Col key={plan.planId} lg={4}>
                <Card className="d-flex flex-column gap-3 py-3">
                  <div className="d-flex align-items-center gap-3 px-4 py-2">
                    <span className="bg-light">
                      <img src={`${liveUrl}${plan.image}`} alt="" width={40} />
                    </span>
                    <span className="d-flex flex-column">
                      <span className="fs-16 fw-bold text-capitalize">
                        {plan.name}
                      </span>
                      <span
                        style={{ color: style.light }}
                        className={style.slim}
                      >
                        {plan.title}
                      </span>
                    </span>
                  </div>
                  <Row className="px-4">
                    <Col xs={6} className="d-flex flex-column px-4">
                      <span
                        style={{ color: style.light }}
                        className={` text-nowrap ${style.slim}`}
                      >
                        Invested Amount
                      </span>
                      <span className={style.medium}>
                        {formatCurrency(plan?.balance?.total)}
                      </span>
                    </Col>
                    <Col xs={6} className="d-flex flex-column px-4">
                      <span
                        style={{ color: style.light }}
                        className={style.slim}
                      >
                        Win Rate
                      </span>
                      <span className={style.medium}>
                        {plan.analytics.winRate}%
                      </span>
                    </Col>
                  </Row>
                  <Row className="px-4">
                    <Col xs={6} className="d-flex flex-column px-4">
                      <span
                        style={{ color: style.light }}
                        className={style.slim}
                      >
                        24H Returns
                      </span>
                      <span className={style.medium}>
                        {plan.analytics.dailyReturn}%
                      </span>
                    </Col>
                    <Col xs={6} className="d-flex flex-column px-4">
                      <span
                        style={{ color: style.light }}
                        className={style.slim}
                      >
                        Duration
                      </span>
                      <span className={style.medium}>{plan.duration}(s)</span>
                    </Col>
                  </Row>
                  <Row className="px-4">
                    <Col xs={6} className="d-flex flex-column px-4">
                      <span
                        style={{ color: style.light }}
                        className={style.slim}
                      >
                        AUM(USD)
                      </span>
                      <span className={style.medium}>{plan.aum}M</span>
                    </Col>
                    <Col xs={6} className="d-flex flex-column px-4">
                      <span
                        style={{ color: style.light }}
                        className={style.slim}
                      >
                        Risk Level
                      </span>
                      <span
                        className={`d-flex align-items-center p-1 rounded justify-content-center fs-10 fw-semibold  ${
                          plan?.risk === "conservative"
                            ? "bg-primary-subtle"
                            : plan?.risk === "aggressive"
                              ? "bg-danger-subtle"
                              : plan?.risk === "moderate"
                                ? "bg-warning-subtle"
                                : null
                        }`}
                        style={{
                          color:
                            plan?.risk === "conservative"
                              ? "#5162be"
                              : plan?.risk === "aggressive"
                                ? "#F17171"
                                : plan?.risk === "moderate"
                                  ? "#FFC84B"
                                  : null,
                          width: "98px",
                        }}
                      >
                        {capitalize(plan?.risk)}{" "}
                        <i className="ri-arrow-right-up-line fs-10"></i>
                      </span>
                    </Col>
                  </Row>
                  <hr style={{ color: "#dedede" }} />
                  <Row className="px-4 d-flex align-items-end mb-2">
                    <Col xs={6} className="d-flex flex-column px-4">
                      <span
                        className={style.large}
                        style={{ color: style.green, fontSize: "32px" }}
                      >
                        {plan.analytics.expectedReturn}%
                      </span>
                      <span
                        style={{ color: style.light }}
                        className={`text-nowrap ${style.slim}`}
                      >
                        Expected returns
                      </span>
                    </Col>
                    <Col xs={6} className="d-flex flex-column px-4">
                      <button className="btn btn-success">Active</button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })}
      </Row>
    </React.Fragment>
  );
};

export default ActivePlans;
