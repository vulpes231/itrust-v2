import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { formatCurrency } from "../../constants";
import numeral from "numeral";

const FootStats = ({ activeWallet, walletData, cashAccount }) => {
  // console.log(walletData);
  const totalInv = walletData
    ? walletData[activeWallet?.slug]?.totalInvested
    : 0;

  // +walletData[activeWallet?.slug]?.totalProfitLoss
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
              {walletData ? formatCurrency(totalInv) : formatCurrency(0)}
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
              {" "}
              {walletData
                ? formatCurrency(
                    walletData[activeWallet?.slug]?.totalProfitLoss,
                  )
                : formatCurrency(0)}
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
              {" "}
              {activeWallet?.balance?.available
                ? formatCurrency(activeWallet.balance?.available)
                : formatCurrency(0)}
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
              {" "}
              {cashAccount?.balance?.total
                ? formatCurrency(cashAccount.balance?.total)
                : formatCurrency(0)}
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
                  {formatCurrency(activeWallet?.balance?.available) ||
                    formatCurrency(0)}
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
                  {" "}
                  {formatCurrency(activeWallet?.marginDebt) ||
                    formatCurrency(0)}
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
