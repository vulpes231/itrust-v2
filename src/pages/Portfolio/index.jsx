import React, { useEffect, useState, useMemo } from "react";
import { Col, Container, Row } from "reactstrap";
import PortfolioStatistics from "./PortfolioStatistics";
import MarketStatus from "./MarketStatus";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import VerifyAccountNotify from "../VerifyAccountNotify";
import BalanceCard from "./BalanceCard";
import { getAccessToken } from "../../constants";
import {
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
    if (!wallets || wallets.length === 0) {
      return [];
    }

    const result = wallets.reduce(
      (acc, wallet) => {
        const isCashWallet = wallet.slug === "cash";

        if (!isCashWallet) {
          acc.defaultWallets.push(wallet);
          acc.totalBalance += wallet.balance.total || 0;
          acc.availableBalance += wallet.balance.available || 0;
        }

        return acc;
      },
      {
        defaultWallets: [],
        totalBalance: 0,
        availableBalance: 0,
      },
    );

    const investing = {
      balance: {
        total: result.totalBalance,
        available: result.availableBalance,
      },
      slug: "default",
      name: "investing",
      _id: "default",
      dailyProfitPercent:
        result.defaultWallets.reduce(
          (acc, wallet) => acc + (wallet.dailyProfitPercent || 0),
          0,
        ) / (result.defaultWallets.length || 1),
    };

    return [investing, ...result.defaultWallets];
  }, [wallets]);

  const [activeWallet, setActiveWallet] = useState(null);

  useEffect(() => {
    if (
      filteredWallets.length > 0 &&
      (!activeWallet || activeWallet._id === "default")
    ) {
      setActiveWallet(filteredWallets[0]);
    }
  }, [filteredWallets, activeWallet]);

  const handleChange = (e) => {
    const walletId = e.target.value;
    const selectedWallet = filteredWallets.find(
      (wallet) => wallet._id === walletId,
    );

    if (!selectedWallet) {
      return;
    }

    setActiveWallet(selectedWallet);
  };

  if (getWalletLoading || !wallets) {
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

  const cashAccount = wallets.find((wall) => wall.slug === "cash");

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
              />
              <Positions />
            </Col>
            <Col lg={4}>
              <TradeCard walletData={walletData} />
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
