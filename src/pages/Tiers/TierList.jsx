import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Card, Col, Row, Spinner } from "reactstrap";

import { FaCircleCheck } from "react-icons/fa6";
import { CiMedal } from "react-icons/ci";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { TbStack } from "react-icons/tb";

import numeral from "numeral";

import { getAvailableTiers } from "../../services/user/tiers";
import { getAccessToken } from "../../constants";

import {
  getTransactionAnalytics,
  getTransactions,
} from "../../services/user/transactions";

import { getUserInfo } from "../../services/user/user";

import ShowTierCode from "./ShowTierCode";
import ErrorToast from "../../components/Common/ErrorToast";

const getTierIcon = (tag) => {
  switch (tag) {
    case "starter":
      return <TbStack size={25} className="text-secondary" />;

    case "professional":
      return <CiMedal size={25} className="text-secondary" />;

    case "premium":
      return <HiOutlineSquare3Stack3D size={25} className="text-secondary" />;

    default:
      return <TbStack size={25} className="text-secondary" />;
  }
};

const TierList = ({ currency }) => {
  const token = getAccessToken();

  const [error, setError] = useState("");
  const [showTier, setShowTier] = useState(false);

  const {
    data: tiers = [],
    isLoading: getTiersLoading,
    isError: getTiersError,
  } = useQuery({
    queryKey: ["tiers"],
    queryFn: getAvailableTiers,
    enabled: !!token,
  });

  const {
    data: trxAnalytics,
    isLoading: getAnalyticsLoading,
    isError: getAnalyticsError,
  } = useQuery({
    queryKey: ["trxAnalytics"],
    queryFn: getTransactionAnalytics,
    enabled: !!token,
  });

  const {
    data: user,
    isLoading: getUserLoading,
    isError: getUserError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    enabled: !!token,
  });

  const {
    data: transactions = [],
    isLoading: getTransactionsLoading,
    isError: getTransactionsError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
    enabled: !!token,
  });

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const sortedTiers = [...tiers];

  const currentTier = Number(user?.accountTier?.currentTier) || 0;

  const activeTierIndex = currentTier > 0 ? currentTier - 1 : -1;

  const pendingWithdrawals = transactions.filter(
    (trx) => trx.type === "withdraw" && trx.status === "pending",
  );

  const showTierOption =
    user?.accountTier?.isCodeActivated && pendingWithdrawals.length > 0;

  const handleGetTier = () => {
    if (!trxAnalytics || !user) {
      setError("An error occurred. Try again later.");

      return;
    }

    if (activeTierIndex === -1) {
      setError("Active tier not found.");

      return;
    }

    const activeTier = sortedTiers[activeTierIndex];

    if (!activeTier) {
      setError("Active tier not found.");

      return;
    }

    const minimumDeposit =
      Number(user.accountTier?.minDeposit) ||
      Number(activeTier.minDeposit) ||
      0;

    const totalDeposited = Number(trxAnalytics.totalDeposit) || 0;

    if (totalDeposited >= minimumDeposit) {
      setShowTier(true);
    } else {
      setError("You've not met the required deposit of your account tier.");
    }
  };

  const handleUpgrade = (tier) => {
    const tierIdentifier = tier.tag || tier._id;

    console.log("Selected tier:", tierIdentifier);

    // Upgrade API goes here.
  };

  if (
    getTiersLoading ||
    getAnalyticsLoading ||
    getUserLoading ||
    getTransactionsLoading
  ) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner />
      </div>
    );
  }

  if (
    getTiersError ||
    getAnalyticsError ||
    getUserError ||
    getTransactionsError
  ) {
    return (
      <div className="text-center py-5">
        <p className="text-danger mb-0">
          Unable to load account tier information.
        </p>
      </div>
    );
  }

  if (!tiers.length) {
    return (
      <div className="text-center py-5">
        <p className="text-muted mb-0">
          No account tiers are currently available.
        </p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div>
        {/* Page Header */}
        <div className="d-flex flex-column align-items-center justify-content-center mt-4 mb-4 pt-2 pb-2 text-center">
          <h3>View Your Account Tier</h3>

          <p className="text-muted mb-0">
            Access the tools, strategies, and support that fit your investment
            level.
          </p>
        </div>

        {/* Tier Cards */}
        <Row>
          {sortedTiers.map((tier, index) => {
            const tierIdentifier = tier.tag || tier._id;

            const isActive = index === activeTierIndex;

            const isPassed = activeTierIndex !== -1 && index < activeTierIndex;

            const isUpgrade = activeTierIndex !== -1 && index > activeTierIndex;

            return (
              <Col
                key={tier._id || tierIdentifier}
                md={6}
                lg={4}
                className="mb-4 mt-3"
              >
                <Card
                  style={{
                    minHeight: "450px",
                  }}
                  className={`
                    p-4
                    h-100
                    d-flex
                    flex-column
                    justify-content-between
                    ${
                      isActive
                        ? "bg-secondary-subtle border border-secondary"
                        : ""
                    }
                  `}
                >
                  <div>
                    {/* Header */}
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h5 className="text-capitalize mb-1">{tier.title}</h5>

                        <p className="text-muted text-capitalize mb-0">
                          {tier.tag}
                        </p>
                      </div>

                      <span
                        className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "35px",
                          height: "35px",
                        }}
                      >
                        {getTierIcon(tier.tag)}
                      </span>
                    </div>

                    {/* Threshold */}
                    <div className="mt-4">
                      <h3 className="mb-1">
                        {currency?.sign}
                        {numeral(tier.threshold).format("0,0")}
                      </h3>

                      <p className="text-muted mb-0">Account Threshold</p>
                    </div>

                    <hr />

                    {/* Features */}
                    <div className="d-flex flex-column gap-2">
                      {Array.isArray(tier.features) &&
                        tier.features.map((feature, featureIndex) => {
                          const hasMinimumDeposit = feature
                            .toLowerCase()
                            .includes("minimum deposit");

                          return (
                            <span
                              key={`
                                  ${tier._id}
                                  -feature-
                                  ${featureIndex}
                                `}
                              className="d-flex gap-2 align-items-center text-muted"
                            >
                              <FaCircleCheck className="text-success flex-shrink-0" />

                              <span>
                                {hasMinimumDeposit
                                  ? `${feature} - ${currency?.sign}${numeral(
                                      tier.minDeposit,
                                    ).format("0,0")}`
                                  : feature}
                              </span>
                            </span>
                          );
                        })}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="mt-4 d-flex flex-column">
                    {isActive ? (
                      <button
                        type="button"
                        onClick={handleGetTier}
                        className={`
                          btn
                          ${showTierOption ? "btn-danger" : "btn-secondary"}
                        `}
                        disabled={!showTierOption}
                      >
                        {showTierOption ? "Get Tier Code" : "Current Tier"}
                      </button>
                    ) : isPassed /*
                       * Don't show anything for tiers
                       * already passed.
                       */ ? null : isUpgrade ? (
                      <button
                        type="button"
                        className="btn bg-secondary-subtle text-secondary"
                        onClick={() => handleUpgrade(tier)}
                      >
                        Upgrade
                      </button>
                    ) : null}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>

      {/* Tier Code Modal */}
      {showTier && (
        <ShowTierCode
          isOpen={showTier}
          handleToggle={() => setShowTier(false)}
          code={user?.accountTier?.withdrawalCode}
        />
      )}

      {/* Error */}
      {error && <ErrorToast errorMsg={error} onClose={() => setError("")} />}
    </React.Fragment>
  );
};

export default TierList;
