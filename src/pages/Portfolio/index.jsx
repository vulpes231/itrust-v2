import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

import PortfolioStatistics from "./PortfolioStatistics";
import MarketStatus from "./MarketStatus";

import BreadCrumb from "../../Components/Common/BreadCrumb";

import VerifyAccountNotify from "../VerifyAccountNotify";
import BalanceCard from "./BalanceCard";
import { getAccessToken } from "../../constants";
import { getUserWallets, getWalletAnalytics } from "../../services/user/wallet";
import { useQuery } from "@tanstack/react-query";
import TradeCard from "./TradeCard";
import AssetAllocation from "./AssetAllocation";
import AssetGraph from "./AssetGraph";
import RecentOrders from "../DashboardCrypto/RecentOrders";
import { getUserTrades } from "../../services/user/trade";

const Portfolio = () => {
  document.title = "Portfolio - Itrust Investments";

  const tk = getAccessToken();

  const [activeWallet, setActiveWallet] = useState(null);

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

  const queryData = { limit: 7 };
  const { data: trades } = useQuery({
    queryKey: ["recentTrades"],
    queryFn: () => getUserTrades(),
    enabled: !!tk,
  });

  const result = (wallets || []).reduce(
    (acc, wallet) => {
      if (wallet.slug !== "cash") {
        acc.defaultWallets.push(wallet);
      }

      acc.totalBalance += wallet.totalBalance;
      acc.availableBalance += wallet.availableBalance;

      return acc;
    },
    {
      defaultWallets: [],
      totalBalance: 0,
      availableBalance: 0,
    }
  );

  const investing = {
    totalBalance: result.totalBalance,
    availableBalance: result.availableBalance,
    slug: "default",
    name: "investing",
    _id: "default",
  };

  const filteredWallets = [investing, ...result.defaultWallets];

  // console.log(filteredWallets);

  const handleChange = (e) => {
    const walletId = e.target.value;

    const selectedWallet = filteredWallets.find(
      (wallet) => wallet._id === walletId
    );

    setActiveWallet(selectedWallet || null);
  };

  useEffect(() => {
    if (!activeWallet && filteredWallets.length > 0) {
      setActiveWallet(filteredWallets[0]);
    }
  }, [filteredWallets, activeWallet]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Portfolio" pageTitle="History" />
          <VerifyAccountNotify />
          <Row>
            <Col xxl={9}>
              <BalanceCard
                activeWallet={activeWallet}
                handleChange={handleChange}
                wallets={filteredWallets}
              />
              <PortfolioStatistics
                dataColors='["--vz-info"]'
                activeWallet={activeWallet}
              />

              <MarketStatus activeWallet={activeWallet} trades={trades} />
            </Col>
            <Col xxl={3}>
              <TradeCard />
              <AssetGraph
                count={trades?.length}
                walletAnalytics={walletAnalytics}
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
