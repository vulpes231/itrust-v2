import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";

import Watchlist from "./Watchlist";
import PortfolioStatistics from "./PortfolioStatistics";
import MarketStatus from "./MarketStatus";
import Widgets from "./Widgets";
import RecentTransaction from "./RecentTransaction";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TopPerformers from "../DashboardCrypto/TopPerformers";
import VerifyAccountNotify from "../VerifyAccountNotify";
import BalanceCard from "./BalanceCard";
import { getAccessToken } from "../../constants";
import { getUserWallets } from "../../services/user/wallet";
import { useQuery } from "@tanstack/react-query";
import TradeCard from "./TradeCard";
import AssetAllocation from "./AssetAllocation";
import AssetGraph from "./AssetGraph";
import RecentOrders from "./RecentOrders";

const Portfolio = () => {
  document.title = "Portfolio - Itrust Investments";

  const tk = getAccessToken();

  const [activeWallet, setActiveWallet] = useState(null);

  const { data: wallets, isLoading: getWalletLoading } = useQuery({
    queryFn: getUserWallets,
    queryKey: ["userWallets"],
    enabled: !!tk,
  });

  const handleChange = (e) => {
    const walletId = e.target.value.toString();

    const selectedWallet =
      wallets &&
      wallets.length > 0 &&
      wallets.find((wallet) => wallet._id.toString() === walletId);

    setActiveWallet(selectedWallet);
  };

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
                wallets={wallets}
              />
              <PortfolioStatistics
                dataColors='["--vz-info"]'
                activeWallet={activeWallet}
              />
              <Watchlist />
              <MarketStatus />
            </Col>
            <Col xxl={3}>
              <TradeCard />
              <AssetGraph />
              <AssetAllocation />
              <RecentOrders />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Portfolio;
