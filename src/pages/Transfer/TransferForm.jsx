import React, { useState } from "react";
import { Card, Col, Row } from "reactstrap";
import Crypto from "./Crypto";
import TrxCrumb from "../../components/Common/TrxCrumb";
import BalanceCard from "../Deposit/BalanceCard";
import TransferLimits from "./TransferLimits";
import AccountList from "./AccountList";

const TransferForm = () => {
  const [activeTab, setActiveTab] = useState("crypto");

  const toggleTab = (type) => {
    setActiveTab(type);
  };

  const getWalletIcon = (value) => {
    switch (value) {
      case "cash account":
        return (
          <span
            className="bg-info-subtle p-2 rounded-circle justify-content-center align-items-center d-flex"
            style={{ width: "35px", height: "35px" }}
          >
            <i class="ri-wallet-line fs-20 text-info"></i>
          </span>
        );
      case "automated investing":
        return (
          <span
            className="bg-warning-subtle p-2 rounded-circle justify-content-center align-items-center d-flex"
            style={{ width: "35px", height: "35px" }}
          >
            <i class="ri-24-hours-line fs-20 text-warning"></i>
          </span>
        );
      case "individual brokerage":
        return (
          <span
            className="bg-secondary-subtle p-2 rounded-circle justify-content-center align-items-center d-flex"
            style={{ width: "35px", height: "35px" }}
          >
            <i className="ri-bar-chart-2-line fs-20 text-secondary"></i>
          </span>
        );
      case "traditional IRA":
        return <i className="ri-shield-line fs-20"></i>;
      case "health savings":
        return <i className="ri-service-line fs-20"></i>;
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <TrxCrumb title={"Transfer"} handleMove={() => window.history.back()} />
      <Row>
        <Col lg={9}>
          <Card>
            <Crypto getWalletIcon={getWalletIcon} />
          </Card>
        </Col>
        <Col lg={3}>
          <Card>
            <BalanceCard />
          </Card>
          <Card>
            <AccountList getWalletIcon={getWalletIcon} />
          </Card>
          <Card>
            <TransferLimits />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TransferForm;
