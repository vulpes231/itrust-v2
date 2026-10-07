import React from "react";
import { Col, Row } from "reactstrap";
import numeral from "numeral";

const FootStats = ({
  activeWallet,
  cashAccount,
  currency,
  user,
  walletData,
}) => {
  const planTotal =
    user?.activePlans?.reduce((sum, plan) => {
      return sum + plan.balance.total;
    }, 0) ?? 0;

  const totalInv = walletData
    ? walletData[activeWallet?.slug]?.totalInvested
    : 0;

  return (
    <Col className="p-3 bg-light-subtle mb-3 d-flex flex-column gap-3">
      <Row className="px-3">
        <Col
          style={{ border: "solid 1px #dedede" }}
          className="border-1 border-dotted p-2"
          md={activeWallet && activeWallet.slug === "brokerage" ? 4 : 3}
        >
          <div className="d-flex flex-column">
            <span className="fs-17 fw-semibold">
              {currency?.sign}
              {walletData
                ? numeral(totalInv).format("0,0.00")
                : numeral(0).format("0,0.00")}
            </span>
            <span
              style={{ color: "#878A99" }}
              className="text-capitalize fs-14 fw-normal"
            >
              total investments
            </span>
          </div>
        </Col>
        <Col
          md={activeWallet && activeWallet.slug === "brokerage" ? 4 : 3}
          style={{ border: "solid 1px #dedede" }}
          className="border-1 border-dotted p-2"
        >
          <div className="d-flex flex-column">
            <span className="fs-17 fw-semibold">
              {currency?.sign}
              {walletData
                ? numeral(
                    walletData[activeWallet?.slug]?.totalProfitLoss,
                  ).format("0,0.00")
                : numeral(0).format("0,0.00")}
            </span>
            <span
              style={{ color: "#878A99" }}
              className="text-capitalize fs-14 fw-normal"
            >
              P&amp;L
            </span>
          </div>
        </Col>
        <Col
          md={activeWallet && activeWallet.slug === "brokerage" ? 4 : 3}
          style={{ border: "solid 1px #dedede" }}
          className="border-1 border-dotted p-2"
        >
          <div className="d-flex flex-column">
            <span className="fs-17 fw-semibold">
              {currency?.sign}
              {activeWallet?.balance?.available &&
              activeWallet?.slug !== "brokerage"
                ? numeral(activeWallet?.balance?.available - planTotal).format(
                    "0,0.00",
                  )
                : numeral(activeWallet?.balance?.available).format("0,0.00")}
            </span>
            <span
              style={{ color: "#878A99" }}
              className="text-capitalize fs-14 fw-normal"
            >
              uninvested cash
            </span>
          </div>
        </Col>
        <Col
          md={activeWallet && activeWallet.slug === "brokerage" ? 4 : 3}
          style={{ border: "solid 1px #dedede" }}
          className="border-1 border-dotted p-2"
        >
          <div className="d-flex flex-column">
            <span className="fs-17 fw-semibold">
              {currency?.sign}
              {cashAccount?.balance?.total
                ? numeral(cashAccount.balance?.total).format("0,0.00")
                : numeral(0).format("0,0.00")}
            </span>
            <span
              style={{ color: "#878A99" }}
              className="text-capitalize fs-14 fw-normal"
            >
              cash balance
            </span>
          </div>
        </Col>

        {activeWallet && activeWallet.slug === "brokerage" && (
          <React.Fragment>
            <Col
              style={{ border: "solid 1px #dedede" }}
              className="border-1 border-dotted p-2"
              md={4}
            >
              <div className="d-flex flex-column">
                <span className="fs-17 fw-semibold">
                  {currency?.sign}
                  {numeral(activeWallet?.balance?.available).format("0,0.00") ||
                    numeral(0).format("0,0.00")}
                </span>
                <span
                  style={{ color: "#878A99" }}
                  className="text-capitalize fs-14 fw-normal"
                >
                  buy power
                </span>
              </div>
            </Col>
            <Col
              md={4}
              style={{ border: "solid 1px #dedede" }}
              className="border-1 border-dotted p-2"
            >
              <div className="d-flex flex-column">
                <span className="fs-17 fw-semibold">
                  {currency?.sign}
                  {numeral(activeWallet?.marginDebt).format("0,0.00") ||
                    numeral(0).format("0,0.00")}
                </span>
                <span
                  style={{ color: "#878A99" }}
                  className="text-capitalize fs-14 fw-normal"
                >
                  margin debt
                </span>
              </div>
            </Col>
          </React.Fragment>
        )}
      </Row>
    </Col>
  );
};

export default FootStats;
