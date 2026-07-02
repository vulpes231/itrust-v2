import React, { useEffect, useState, useMemo } from "react";
import { Col, Container, Row } from "reactstrap";
import PortfolioStatistics from "./PortfolioStatistics";
import MarketStatus from "./MarketStatus";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import VerifyAccountNotify from "../VerifyAccountNotify";
import BalanceCard from "./BalanceCard";
import { getAccessToken } from "../../constants";
import {
  getPortfolioAccounts,
  getTradingAccounts,
  getUserWallets,
  getWalletAnalytics,
  getWalletInvestData,
} from "../../services/user/wallet";
import { useQuery } from "@tanstack/react-query";
import TradeCard from "./TradeCard";
import AssetAllocation from "./AssetAllocation";
import AssetGraph from "./AssetGraph";
import RecentOrders from "../DashboardCrypto/RecentOrders";
import { getUserTrades } from "../../services/user/trade";
import Positions from "./Positions";
import { getUserPositions } from "../../services/user/position";

const Portfolio = () => {
  document.title = "Portfolio - Itrust Investments";

  const tk = getAccessToken();

  const { data: wallets, isLoading: getWalletLoading } = useQuery({
    queryFn: getUserWallets,
    queryKey: ["userWallets"],
    enabled: !!tk,
  });

  const { data: portfolioAccounts, isLoading: getPortfolioAccountsLoading } =
    useQuery({
      queryFn: getPortfolioAccounts,
      queryKey: ["portfolioAccounts"],
      enabled: !!tk,
    });

  const { data: tradingAccounts } = useQuery({
    queryFn: getTradingAccounts,
    queryKey: ["tradignAccounts"],
    enabled: !!tk,
  });

  const { data: walletAnalytics, isLoading: getAnalyticsLoading } = useQuery({
    queryFn: getWalletAnalytics,
    queryKey: ["walletAnalytics"],
    enabled: !!tk,
  });

  const { data: walletData } = useQuery({
    queryKey: ["walletdata"],
    queryFn: getWalletInvestData,
    enabled: !!tk,
  });

  const queryData = { limit: 7 };
  const { data: trades } = useQuery({
    queryKey: ["recentTrades"],
    queryFn: () => getUserTrades(),
    enabled: !!tk,
  });

  const { data: positionData } = useQuery({
    queryKey: ["positionData"],
    queryFn: () => getUserPositions(),
    enabled: !!tk,
  });

  const filteredWallets = useMemo(() => {
    if (!portfolioAccounts || portfolioAccounts.length === 0) {
      return [];
    }

    return portfolioAccounts;
  }, [portfolioAccounts]);

  const [activeWallet, setActiveWallet] = useState(null);

  useEffect(() => {
    if (!filteredWallets.length) return;

    const savedWalletId = sessionStorage.getItem("activeWalletId");

    // try restoring saved wallet
    const savedWallet = filteredWallets.find(
      (wallet) => wallet._id === savedWalletId,
    );

    if (savedWallet) {
      setActiveWallet(savedWallet);
    } else {
      // fallback to first wallet
      setActiveWallet(filteredWallets[0]);
      sessionStorage.setItem("activeWalletId", filteredWallets[0]._id);
    }
  }, [filteredWallets]);

  const handleChange = (e) => {
    const walletId = e.target.value;

    const selectedWallet = filteredWallets.find(
      (wallet) => wallet._id === walletId,
    );

    if (!selectedWallet) return;

    setActiveWallet(selectedWallet);

    sessionStorage.setItem("activeWalletId", walletId);
  };

  // useEffect(() => {
  //   if (
  //     filteredWallets.length > 0 &&
  //     (!activeWallet || activeWallet._id === "default")
  //   ) {
  //     sessionStorage.setItem("activeWalletId", filteredWallets[0]._id);
  //     setActiveWallet(filteredWallets[0]);
  //   }
  // }, [filteredWallets, activeWallet]);

  if (getPortfolioAccountsLoading || !portfolioAccounts) {
    return (
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Portfolio" pageTitle="History" />
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const cashAccount =
    wallets &&
    wallets.length > 0 &&
    wallets.find((wall) => wall.slug === "cash");

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Portfolio" pageTitle="History" />
          <VerifyAccountNotify />
          <Row>
            <Col lg={8}>
              <BalanceCard
                activeWallet={activeWallet}
                handleChange={handleChange}
                wallets={filteredWallets}
                walletData={walletData}
              />
              <PortfolioStatistics
                dataColors='["--vz-info"]'
                activeWallet={activeWallet}
                walletData={walletData}
                cash={cashAccount}
                analytics={walletAnalytics}
              />

              <MarketStatus
                activeWallet={activeWallet}
                trades={positionData?.positions}
                accounts={filteredWallets}
              />
              <Positions accounts={filteredWallets} />
            </Col>
            <Col lg={4}>
              <TradeCard
                walletData={walletData}
                tradingAccounts={tradingAccounts}
              />
              <AssetGraph
                count={positionData?.positions?.length}
                walletAnalytics={walletAnalytics}
                walletData={walletData}
              />
              <AssetAllocation />
              <RecentOrders trades={trades} />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Portfolio;
