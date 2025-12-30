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

  // useEffect(() => {
  //   if (user) console.log(user.savingsAccounts);
  // }, [user]);

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
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Saving;
