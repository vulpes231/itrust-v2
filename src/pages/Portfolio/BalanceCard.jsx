import React, { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { Card, Col, Input, Row } from "reactstrap";
import { format } from "date-fns";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { formatCurrency, getAccessToken } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { getUserWallets } from "../../services/user/wallet";

const BalanceCard = ({ activeWallet, handleChange, wallets }) => {
  return (
    <Card>
      <Row className="p-3">
        <Col md={3} style={{ color: "#495057" }}>
          <div className="d-flex align-items-start justify-content-between">
            <select
              className="border-0 bg-transparent fs-13 text-uppercase"
              onChange={handleChange}
              style={{ color: "#878A99" }}
            >
              {activeWallet && wallets && wallets.length === 0 && (
                <option value="">Account</option>
              )}
              {(wallets || []).map((wallet) => {
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
          <div className="d-flex align-items-center justify-content-between">
            <h3>
              {" "}
              {activeWallet?.availableBalance
                ? formatCurrency(activeWallet.availableBalance)
                : formatCurrency(0)}
            </h3>
            <span
              className={`px-3 py-1  fs-10 fw-light rounded-1 ${
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
          <span style={{ color: "#878A99" }} className="fs-11 fw-light">
            Update at{" "}
            {`${format(Date.now(), "dd/MM/yyyy")} at ${format(
              Date.now(),
              "hh:ss a"
            )}`}
          </span>
        </Col>
      </Row>
    </Card>
  );
};

export default BalanceCard;
