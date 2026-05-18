import { capitalize } from "lodash";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { cash } from "../../assets";
import { formatCurrency, liveUrl } from "../../constants";
import { useMutation } from "@tanstack/react-query";
import { activatePlan } from "../../services/user/invest";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import ActivatePlanModal from "./ActivatePlanModal";

const AllPlans = ({ plans, style }) => {
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showActivateModal, setShowActivateModal] = useState(false);

  const handleActivation = (e, plan) => {
    e.preventDefault();
    if (!plan) {
      setError("Select a plan!");
    }
    setSelectedPlan(plan);
    setShowActivateModal(true);
  };

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

  return (
    <React.Fragment>
      <Row className="g-4 py-3">
        {plans.map((plan) => {
          return (
            <Col key={plan._id} lg={4}>
              <Card className="d-flex flex-column gap-3 py-3">
                <div className="d-flex align-items-center gap-3 px-4 py-2">
                  <span className="bg-light">
                    <img
                      src={`${liveUrl}${plan?.img}`}
                      alt=""
                      width={40}
                      className="rounded-circle"
                    />
                  </span>
                  <span className="d-flex flex-column">
                    <span className="fs-16 fw-bold text-capitalize">
                      {plan?.name}
                    </span>
                    <span style={{ color: style.light }} className={style.slim}>
                      {plan?.title}
                    </span>
                  </span>
                </div>
                <Row className="px-4">
                  <Col xs={6} className="d-flex flex-column px-4">
                    <span style={{ color: style.light }} className={style.slim}>
                      Min Investment
                    </span>
                    <span className={style.medium}>
                      {formatCurrency(plan?.minInvestment)}
                    </span>
                  </Col>
                  <Col xs={6} className="d-flex flex-column px-4">
                    <span style={{ color: style.light }} className={style.slim}>
                      Win Rate
                    </span>
                    <span className={style.medium}>
                      {plan?.performance?.winRate}%
                    </span>
                  </Col>
                </Row>
                <Row className="px-4">
                  <Col xs={6} className="d-flex flex-column px-4">
                    <span style={{ color: style.light }} className={style.slim}>
                      24H Returns
                    </span>
                    <span className={style.medium}>
                      {plan?.performance?.dailyReturnPercent}%
                    </span>
                  </Col>
                  <Col xs={6} className="d-flex flex-column px-4">
                    <span style={{ color: style.light }} className={style.slim}>
                      Duration
                    </span>
                    <span className={style.medium}>
                      {`${plan?.expiresIn?.milestone} ${plan?.expiresIn?.duration}`}
                      (s)
                    </span>
                  </Col>
                </Row>
                <Row className="px-4">
                  <Col xs={6} className="d-flex flex-column px-4">
                    <span style={{ color: style.light }} className={style.slim}>
                      AUM(USD)
                    </span>
                    <span className={style.medium}>
                      {plan?.performance?.aum}M
                    </span>
                  </Col>
                  <Col xs={6} className="d-flex flex-column px-4">
                    <span style={{ color: style.light }} className={style.slim}>
                      Risk Level
                    </span>
                    <span
                      className={`d-flex align-items-center p-1 rounded justify-content-center fs-10 fw-semibold  ${
                        plan?.planType === "conservative"
                          ? "bg-primary-subtle"
                          : plan?.planType === "aggressive"
                            ? "bg-danger-subtle"
                            : plan?.planType === "moderate"
                              ? "bg-warning-subtle"
                              : null
                      }`}
                      style={{
                        color:
                          plan?.planType === "conservative"
                            ? "#5162be"
                            : plan?.planType === "aggressive"
                              ? "#F17171"
                              : plan?.planType === "moderate"
                                ? "#FFC84B"
                                : null,
                        width: "98px",
                      }}
                    >
                      {capitalize(plan?.planType)}{" "}
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
                      {plan?.performance?.expectedReturnPercent}%
                    </span>
                    <span style={{ color: style.light }} className={style.slim}>
                      Expected returns
                    </span>
                  </Col>
                  <Col xs={6} className="d-flex flex-column px-4">
                    <button
                      type="button"
                      onClick={(e) => handleActivation(e, plan)}
                      className="btn btn-primary"
                    >
                      Start Plan
                    </button>
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>
      {error && (
        <ErrorToast
          errorMsg={error}
          isOpen={error}
          onClose={() => setError("")}
        />
      )}
      {showActivateModal && (
        <ActivatePlanModal
          plan={selectedPlan}
          isOpen={showActivateModal}
          handleToggle={() => {
            setSelectedPlan("");
            setShowActivateModal(false);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default AllPlans;
