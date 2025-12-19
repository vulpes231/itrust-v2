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

import Bank from "./Bank";
import Crypto from "./Crypto";
import { getAccessToken } from "../../constants";
import { getSettings } from "../../services/user/settings";
import { useQuery } from "@tanstack/react-query";
import TrxCrumb from "../../components/Common/TrxCrumb";
import BalanceCard from "../Deposit/BalanceCard";
import WithdrawalLimits from "./WithdrawLimits";
import PendingWithdrawal from "./PendingWithdrawal";
import WithdrawStat from "./WithdrawStat";
import WithForm from "./WithForm";
import { getTransactionAnalytics } from "../../services/user/transactions";

const WithdrawForm = () => {
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
      <TrxCrumb
        title={"Withdrawal"}
        handleMove={() => setActiveView("default")}
      />
      <Row>
        <Col lg={9}>
          <Card>
            {activeView === "default" ? (
              <WithForm handleView={handleView} settings={settings} />
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
          <Card>
            <PendingWithdrawal analytics={analytics} />
          </Card>
          <Card>
            <WithdrawStat analytics={analytics} />
          </Card>
          <Card>
            <WithdrawalLimits />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default WithdrawForm;
