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
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/user/settings";
import { getAccessToken } from "../../constants";
import { getTransactionAnalytics } from "../../services/user/transactions";

const DepositForm = () => {
  const token = getAccessToken();
  const [activeView, setActiveView] = useState("default");

  function handleView(view) {
    setActiveView(view);
  }

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    enabled: !!token,
  });
  const { data: analytics } = useQuery({
    queryKey: ["trxAnalytics"],
    queryFn: getTransactionAnalytics,
    enabled: !!token,
  });

  return (
    <React.Fragment>
      <TrxCrumb title="Deposit" handleMove={() => setActiveView("default")} />
      <Row>
        <Col lg={9}>
          <Card>
            {activeView === "default" ? (
              <Form handleView={handleView} settings={settings} />
            ) : activeView === "crypto" ? (
              <Crypto settings={settings} />
            ) : activeView === "bank" ? (
              <Bank settings={settings} />
            ) : null}
          </Card>
        </Col>
        <Col lg={3}>
          <Card>
            <BalanceCard />
          </Card>
          <Card className="bg-warning-subtle">
            <PendingDeposit analytics={analytics} />
          </Card>
          <Card>
            <AccountStat analytics={analytics} />
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
