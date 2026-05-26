import React from "react";
import { FaEyeSlash } from "react-icons/fa";
import { Card, Col, Input, Row } from "reactstrap";
import { format } from "date-fns";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { formatCurrency } from "../../constants";

const BalanceCard = ({ activeWallet, handleChange, wallets, walletData }) => {
  // Show placeholder if no active wallet
  if (!activeWallet || !wallets || wallets.length === 0) {
    return (
      <Card>
        <Row className="p-3">
          <Col md={3}>
            <div className="d-flex align-items-start justify-content-between">
              <select
                className="border-0 bg-transparent fs-13 text-uppercase"
                disabled
              >
                <option>Loading...</option>
              </select>
            </div>
            <h3>$0.00</h3>
            <span className="fs-11 fw-light">Loading...</span>
          </Col>
        </Row>
      </Card>
    );
  }

  const totalWalletBalance =
    walletData && activeWallet
      ? activeWallet?.balance?.total +
        walletData[activeWallet?.slug].totalProfitLoss
      : 0;

  // console.log(activeWallet);

  return (
    <Card>
      <Row className="p-3">
        <Col md={3}>
          <div className="d-flex align-items-start justify-content-between">
            <select
              className="border-0 bg-transparent fs-13 text-uppercase text-muted"
              onChange={handleChange}
              value={activeWallet?._id || ""}
            >
              {wallets.map((wallet) => {
                return (
                  <option key={wallet._id} value={wallet._id}>
                    {wallet.name}
                  </option>
                );
              })}
            </select>
            <div className="bg-secondary-subtle px-2 rounded-1">
              <FaEyeSlash />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between gap-3">
            <h3>
              {activeWallet?.balance?.total
                ? formatCurrency(totalWalletBalance)
                : formatCurrency(0)}
            </h3>
            <span
              className={`px-3 py-1 fs-10 fw-light rounded-1 d-flex ${
                activeWallet?.dailyProfitPercent &&
                activeWallet?.dailyProfitPercent < 0
                  ? "bg-danger-subtle text-danger"
                  : "bg-success-subtle text-success"
              }`}
            >
              {activeWallet?.dailyProfitPercent &&
              activeWallet?.dailyProfitPercent < 0 ? (
                <IoMdArrowDropdown />
              ) : (
                <IoMdArrowDropup />
              )}
              {activeWallet?.dailyProfitPercent
                ? parseFloat(activeWallet.dailyProfitPercent).toFixed(2)
                : parseFloat(0).toFixed(2)}
              %
            </span>
          </div>
          <span
            style={{ color: "#878A99" }}
            className="fs-11 fw-light"
            style={{ whiteSpace: "nowrap" }}
          >
            Update at {`${format(Date.now(), "dd/MM/yyyy hh:mm a")}`}
          </span>
        </Col>
      </Row>
    </Card>
  );
};

export default BalanceCard;
