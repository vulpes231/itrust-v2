import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../components/Common/BreadCrumb";
import Widgets from "./Widgets";
import Market from "./Market";
import VerifyAccountNotify from "../VerifyAccountNotify";
import AssetManager from "./AssetManager";
import OrderHistory from "./OrderHistory";
import TradeSection from "./TradeSection";
import { getUserWallets, getWalletAnalytics } from "../../services/user/wallet";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../constants";
import { useParams } from "react-router-dom";
import { getAssetInfo } from "../../services/asset/asset";

const BuySell = () => {
  document.title = "Market - Itrust Investments";

  const tk = getAccessToken();
  const { assetId } = useParams();

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

  const { data: preSelectedAsset } = useQuery({
    queryFn: () => getAssetInfo({ assetId }),
    queryKey: ["preSelectedAsset"],
    enabled: !!assetId,
  });

  const { data: walletAnalytics, isLoading: getAnalyticsLoading } = useQuery({
    queryFn: getWalletAnalytics,
    queryKey: ["walletAnalytics"],
  });

  useEffect(() => {
    if (preSelectedAsset) {
      setActiveMarketTab("trade");
    }
  }, [preSelectedAsset]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Market" pageTitle="Trade" />
          <VerifyAccountNotify />
          <Row>
            <Widgets analytics={walletAnalytics} />
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
          {(activeMarketTab === "trade" && showTradeSection) ||
            (preSelectedAsset && activeMarketTab !== "asset" && (
              <Row className="px-3">
                <TradeSection
                  asset={selectedAsset || preSelectedAsset}
                  accounts={wallets}
                />
              </Row>
            ))}
          {activeMarketTab === "asset" && (
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
