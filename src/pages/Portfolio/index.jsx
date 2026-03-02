import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

import PortfolioStatistics from "./PortfolioStatistics";
import MarketStatus from "./MarketStatus";

import BreadCrumb from "../../Components/Common/BreadCrumb";

import VerifyAccountNotify from "../VerifyAccountNotify";
import BalanceCard from "./BalanceCard";
import { getAccessToken } from "../../constants";
import { getUserWallets } from "../../services/user/wallet";
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

  const queryData = { limit: 7 };
  const { data: trades } = useQuery({
    queryKey: ["recentTrades"],
    queryFn: () => getUserTrades(),
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

  useEffect(() => {
    if (wallets && wallets.length > 0) {
      setActiveWallet(wallets[0]);
    }
  }, [wallets]);

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

              <MarketStatus />
            </Col>
            <Col xxl={3}>
              <TradeCard />
              <AssetGraph count={trades?.length} />
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
