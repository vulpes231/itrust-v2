import React from "react";
import { Container, Row } from "reactstrap";
import AllTransactions from "./AllTransactions";
import Widgets from "./Widgets";
import BreadCrumb from "../../components/Common/BreadCrumb";
import VerifyAccountNotify from "../VerifyAccountNotify";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../constants";
import { getTransactionAnalytics } from "../../services/user/transactions";
import { getUserWallets, getWalletAnalytics } from "../../services/user/wallet";
import { getUserInfo } from "../../services/user/user";

const Wallet = () => {
  document.title = "Cash Account - Itrust Investments";

  const token = getAccessToken();

  const { data: wallets } = useQuery({
    queryFn: getUserWallets,
    queryKey: ["wallets"],
    enabled: !!token,
  });

  const { data: user } = useQuery({
    queryFn: getUserInfo,
    queryKey: ["user"],
    enabled: !!token,
  });

  const { data: trxAnalytics } = useQuery({
    queryFn: getTransactionAnalytics,
    queryKey: ["trxAnalytics"],
    enabled: !!token,
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Cash" pageTitle="Account" />
          <VerifyAccountNotify />
          <Row className="p-2">
            <Widgets
              wallets={wallets}
              user={user}
              trxAnalytics={trxAnalytics}
            />
          </Row>
          <AllTransactions currency={user?.currency} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Wallet;
