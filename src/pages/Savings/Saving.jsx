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
import { getUserWallets } from "../../services/user/wallet";

const Saving = () => {
  const token = getAccessToken();

  const { data: savingAnalytics } = useQuery({
    queryKey: ["savingsAnalytics"],
    queryFn: getSavingsAnalytics,
    enabled: !!token,
  });
  const { data: user = null } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    enabled: !!token,
  });

  const { data: wallets = null } = useQuery({
    queryKey: ["wallets"],
    queryFn: getUserWallets,
    enabled: !!token,
  });

  // console.log(savingAnalytics);

  const cashAcct =
    wallets &&
    wallets.length > 0 &&
    wallets.find((acct) => acct.slug === "cash");

  return (
    <React.Fragment>
      <Col className="mt-2">
        <Accounts analytics={savingAnalytics} />
      </Col>
      <Row className="mt-4">
        <Col lg={8}>
          <Retirements
            analytics={savingAnalytics}
            accts={user?.savingsAccounts}
            cashAcct={cashAcct}
          />
          <SavingsAccounts
            analytics={savingAnalytics}
            accts={user?.savingsAccounts}
            cashAcct={cashAcct}
          />
        </Col>
        <Col lg={4}>
          <SavingsList accts={user?.savingsAccounts} />
          <SideContribution accts={user?.savingsAccounts} cash={cashAcct} />
          <SideFund accts={user?.savingsAccounts} cash={cashAcct} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Saving;
