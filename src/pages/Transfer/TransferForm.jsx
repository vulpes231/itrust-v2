import React, { useState } from "react";
import { Card, Col, Row } from "reactstrap";
import Crypto from "./Crypto";
import TrxCrumb from "../../components/Common/TrxCrumb";
import BalanceCard from "../Deposit/BalanceCard";
import TransferLimits from "./TransferLimits";
import AccountList from "./AccountList";
import { getUserInfo } from "../../services/user/user";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../constants";

const TransferForm = () => {
  const [activeTab, setActiveTab] = useState("crypto");

  const toggleTab = (type) => {
    setActiveTab(type);
  };

  const token = getAccessToken();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    enabled: !!token,
  });

  return (
    <React.Fragment>
      <TrxCrumb title={"Transfer"} handleMove={() => window.history.back()} />
      <Row>
        <Col lg={9}>
          <Card className="d-flex d-md-none">
            <BalanceCard currency={user?.currency} />
          </Card>
          <Card>
            <Crypto currency={user?.currency} />
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="d-none d-md-flex">
            <BalanceCard currency={user?.currency} />
          </Card>
          <Card>
            <AccountList currency={user?.currency} />
          </Card>
          <Card>
            <TransferLimits currency={user?.currency} />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TransferForm;
