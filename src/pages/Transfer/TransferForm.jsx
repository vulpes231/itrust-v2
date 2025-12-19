import React, { useState } from "react";
import {
  Card,
  Col,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

// import Bank from "./Bank";
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

  return (
    <React.Fragment>
      <TrxCrumb title={"Transfer"} handleMove={() => window.history.back()} />
      <Row>
        <Col lg={9}>
          <Card>
            <Crypto />
          </Card>
        </Col>
        <Col lg={3}>
          <Card>
            <BalanceCard />
          </Card>
          <Card>
            <AccountList />
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
