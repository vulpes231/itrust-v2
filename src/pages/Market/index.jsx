import React, { useState } from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../components/Common/BreadCrumb";
import Widgets from "./Widgets";
import Market from "./Market";
import VerifyAccountNotify from "../VerifyAccountNotify";
import AssetManager from "./AssetManager";
import OrderHistory from "./OrderHistory";
import TradeSection from "./TradeSection";
import { getUserWallets } from "../../services/user/wallet";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../constants";

const BuySell = () => {
  document.title = "Market - Itrust Investments";

  const tk = getAccessToken();

  const [activeMarketTab, setActiveMarketTab] = useState("asset");
  const [showTradeSection, setShowTradeSection] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("");

  const handleTabChange = (tabName) => {
    setActiveMarketTab(tabName);
  };

  const { data: wallets } = useQuery({
    queryFn: getUserWallets,
    queryKey: ["wallets"],
    enabled: !!tk,
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Market" pageTitle="Trade" />
          <VerifyAccountNotify />
          <Row>
            <Widgets />
          </Row>
          <Row className="px-3">
            <AssetManager
              activeTab={activeMarketTab}
              handleChange={handleTabChange}
              selectedAsset={selectedAsset}
              setSelectedAsset={setSelectedAsset}
              toggleTradeSection={setShowTradeSection}
            />
          </Row>
          <Row className="px-3">
            {showTradeSection && (
              <TradeSection asset={selectedAsset} accounts={wallets} />
            )}
          </Row>
          {activeMarketTab !== "trade" && (
            <Row className="px-3">
              <Market />
            </Row>
          )}
          <Row className="px-3">
            <OrderHistory />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BuySell;
