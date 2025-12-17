import React, { useState } from "react";
import { Col, Row, Card } from "reactstrap";
import BalanceCard from "./BalanceCard";
import PendingDeposit from "./PendingDeposit";
import AccountStat from "./AccountStat";
import DepositLimit from "./DepositLimit";
import Form from "./Form";
import Crypto from "./Crypto";
import Bank from "./Bank";
import TrxCrumb from "../../components/Common/TrxCrumb";

const DepositForm = () => {
  const [activeView, setActiveView] = useState("default");

  function handleView(view) {
    setActiveView(view);
  }
  return (
    <React.Fragment>
      <TrxCrumb title="Deposit" handleMove={() => setActiveView("default")} />
      <Row>
        <Col lg={9}>
          <Card>
            {activeView === "default" ? (
              <Form handleView={handleView} />
            ) : activeView === "crypto" ? (
              <Crypto />
            ) : activeView === "bank" ? (
              <Bank />
            ) : null}
          </Card>
        </Col>
        <Col lg={3}>
          <Card>
            <BalanceCard />
          </Card>
          <Card className="bg-warning-subtle">
            <PendingDeposit />
          </Card>
          <Card>
            <AccountStat />
          </Card>
          <Card>
            <DepositLimit />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DepositForm;
