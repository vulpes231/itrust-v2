import React from "react";

import { Col, Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Widgets from "./Widgets";
import PlanList from "./PlanList";
import VerifyAccountNotify from "../VerifyAccountNotify";
import { useQuery } from "@tanstack/react-query";
import {
  getUserWallets,
  getWalletInvestData,
} from "../../services/user/wallet";
import { getAccessToken } from "../../constants";
import { getUserInfo } from "../../services/user/user";

const Investing = () => {
  document.title = "Automated Investing | Itrust Investments";

  const tk = getAccessToken();

  const { data: walletData } = useQuery({
    queryKey: ["walletData"],
    queryFn: getWalletInvestData,
    enabled: !!tk,
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    enabled: !!tk,
  });

  const { data: wallets } = useQuery({
    queryKey: ["wallets"],
    queryFn: getUserWallets,
    enabled: !!tk,
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Automated Investing" pageTitle="Investing" />
          <VerifyAccountNotify />
          <Col>
            <Widgets user={user} walletData={walletData} wallets={wallets} />
          </Col>
          <Col>
            <PlanList />
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Investing;
