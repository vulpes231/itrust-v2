import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import Accounts from "./Accounts";
import Retirements from "./Retirements";
import SavingsList from "./SavingsList";
import SavingsAccounts from "./SavingsAccounts";
import { useQuery } from "@tanstack/react-query";
import { getSavingsAnalytics } from "../../services/user/savings";
import { getAccessToken } from "../../constants";
import { getUserInfo } from "../../services/user/user";
import SideContribution from "./SideContribution";
import SideFund from "./SideFund";

const Saving = () => {
  const token = getAccessToken();

  const { data: savingAnalytics } = useQuery({
    queryKey: ["savingsAnalytics"],
    queryFn: getSavingsAnalytics,
    enabled: !!token,
  });
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    enabled: !!token,
  });

  const getIcon = (name) => {
    switch (name) {
      case "Traditional IRA":
        return (
          <i style={{ color: "#261CB6" }} className="ri-shield-line fs-22"></i>
        );
      case "Health Savings":
        return (
          <i style={{ color: "#F17171" }} className="ri-service-line fs-22"></i>
        );

      default:
        return null;
    }
  };
  return (
    <React.Fragment>
      <Col className="mt-2">
        <Accounts analytics={savingAnalytics} />
      </Col>
      <Row className="mt-4">
        <Col lg={9}>
          <Retirements
            analytics={savingAnalytics}
            accts={user?.savingsAccounts}
          />
          <SavingsAccounts
            analytics={savingAnalytics}
            accts={user?.savingsAccounts}
          />
        </Col>
        <Col lg={3}>
          <SavingsList accts={user?.savingsAccounts} />
          <SideContribution
            accts={user?.savingsAccounts}
            handleIcon={getIcon}
          />
          <SideFund accts={user?.savingsAccounts} handleIcon={getIcon} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Saving;
