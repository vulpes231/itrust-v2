import React, { useState } from "react";
import { Container, Row, Alert, Col } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import MyCurrencies from "./MyCurrencies";
import MyPortfolio from "./MyPortfolio";
import RecentActivity from "./RecentActivity";
import Widgets1 from "./Widgets1";
import Statistics from "./Statistics";
import VerifyAccountNotify from "../VerifyAccountNotify";
import Holdings from "./Holdings";
import RecentOrders from "./RecentOrders";
import { useQuery } from "@tanstack/react-query";
import { getWalletAnalytics } from "../../services/user/wallet";
import AssetGraph from "../Portfolio/AssetGraph";
import { getUserTrades } from "../../services/user/trade";
import { getAccessToken } from "../../constants";

const DashboardCrypto = () => {
  document.title = "Dashboard - Itrust Investments";

  const tk = getAccessToken();

  const { data: walletAnalytics, isLoading: getAnalyticsLoading } = useQuery({
    queryFn: getWalletAnalytics,
    queryKey: ["walletAnalytics"],
    enabled: !!tk,
  });

  const queryData = { limit: 7 };
  const { data: trades } = useQuery({
    queryKey: ["recentTrades"],
    queryFn: () => getUserTrades(),
    enabled: !!tk,
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Dashboard" pageTitle="Home" />
          <VerifyAccountNotify />

          <Row>
            <Col md={9}>
              <Statistics
                dataColors='["--vz-info"]'
                analytics={walletAnalytics}
              />
              <Widgets1 />
              <MyCurrencies />
            </Col>
            <Col md={3}>
              <MyPortfolio />
              <Holdings trades={trades} analytics={walletAnalytics} />
              <AssetGraph count={trades?.length} />
              <RecentActivity />
              <RecentOrders trades={trades} />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardCrypto;
