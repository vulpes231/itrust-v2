import { capitalize } from "lodash";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { liveUrl } from "../../constants";
import ErrorToast from "../../components/Common/ErrorToast";
import ActivatePlanModal from "./ActivatePlanModal";
import numeral from "numeral";

const AllPlans = ({ plans, style, currency }) => {
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;
  const safePlans = Array.isArray(plans) ? plans : [];
  const totalPages = Math.ceil(safePlans.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [plans]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, Math.max(totalPages, 1)));
  }, [totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPlans = safePlans.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleActivation = (e, plan) => {
    e.preventDefault();

    if (!plan) {
      setError("Select a plan!");
      return;
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
        {paginatedPlans.length > 0 ? (
          paginatedPlans.map((plan) => (
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
                      {currency?.sign}
                      {numeral(plan?.minInvestment).format("0,0.00")}
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

                    <span className={`${style.medium} text-capitalize`}>
                      {plan?.performance?.aum}
                    </span>
                  </Col>

                  <Col xs={6} className="d-flex flex-column px-4">
                    <span style={{ color: style.light }} className={style.slim}>
                      Risk Level
                    </span>

                    <span
                      className={`d-flex align-items-center p-1 rounded justify-content-center fs-10 fw-semibold ${
                        plan?.planType === "conservative"
                          ? "bg-primary-subtle"
                          : plan?.planType === "aggressive"
                            ? "bg-danger-subtle"
                            : plan?.planType === "moderate"
                              ? "bg-warning-subtle"
                              : ""
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
                      {capitalize(plan?.planType || "")}
                      <i className="ri-arrow-right-up-line fs-10"></i>
                    </span>
                  </Col>
                </Row>

                <hr style={{ color: "#dedede" }} />

                <Row className="px-4 d-flex align-items-end mb-2">
                  <Col xs={6} className="d-flex flex-column px-4">
                    <span
                      className={style.large}
                      style={{
                        color: style.green,
                        fontSize: "32px",
                        whiteSpace: "nowrap",
                      }}
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
          ))
        ) : (
          <Col xs={12}>
            <div className="text-center py-4">No plans found.</div>
          </Col>
        )}
      </Row>

      {totalPages > 1 && (
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 py-3">
          <span className="text-muted fs-13">
            Showing {startIndex + 1}–
            {Math.min(startIndex + ITEMS_PER_PAGE, safePlans.length)} of{" "}
            {safePlans.length} plans
          </span>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="text-muted fs-13 text-nowrap">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() =>
                setCurrentPage((page) => Math.min(page + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

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
