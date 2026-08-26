import React, { useEffect, useState } from "react";
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
import { QueryClient, useQuery } from "@tanstack/react-query";
import {
  getTotalNetworth,
  getUserWallets,
  getWalletAnalytics,
  getWalletInvestData,
} from "../../services/user/wallet";
import AssetGraph from "../Portfolio/AssetGraph";
import { getUserTrades } from "../../services/user/trade";
import { getAccessToken } from "../../constants";
import { getUserPositions } from "../../services/user/position";

const DashboardCrypto = () => {
  document.title = "Dashboard - Itrust Investments";

  const tk = getAccessToken();

  const { data: walletAnalytics, isLoading: getAnalyticsLoading } = useQuery({
    queryFn: getWalletAnalytics,
    queryKey: ["walletAnalytics"],
    enabled: !!tk,
  });

  const { data: trades } = useQuery({
    queryKey: ["recentTrades"],
    queryFn: () => getUserTrades(),
    enabled: !!tk,
  });

  const { data: walletData } = useQuery({
    queryKey: ["walletdata"],
    queryFn: getWalletInvestData,
    enabled: !!tk,
  });

  const { data: totalNetworth } = useQuery({
    queryKey: ["networth"],
    queryFn: getTotalNetworth,
    enabled: !!tk,
  });

  const { data: wallets = [], isLoading: isWalletLoading } = useQuery({
    queryFn: getUserWallets,
    queryKey: ["wallet"],
    enabled: !!tk,
  });

  const { data: positionData } = useQuery({
    queryKey: ["positionData"],
    queryFn: () => getUserPositions(),
    enabled: !!tk,
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Dashboard" pageTitle="Home" />
          <VerifyAccountNotify />

          <Row>
            <Col md={8}>
              <Statistics
                dataColors='["--vz-info"]'
                analytics={walletAnalytics}
                walletData={walletData}
                currentNetWorth={totalNetworth}
              />
              <Widgets1 />
              <MyCurrencies />
            </Col>
            <Col md={4}>
              <MyPortfolio
                wallets={wallets}
                walletData={walletData}
                walletAnalytics={walletAnalytics}
                networth={totalNetworth}
              />
              <Holdings />
              <AssetGraph
                count={positionData?.positions?.length}
                walletAnalytics={walletAnalytics}
                walletData={walletData}
              />
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
