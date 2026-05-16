import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../components/Common/BreadCrumb";
import Widgets from "./Widgets";
import Market from "./Market";
import VerifyAccountNotify from "../VerifyAccountNotify";
import AssetManager from "./AssetManager";
import OrderHistory from "./OrderHistory";
import TradeSection from "./TradeSection";
import {
  getUserWallets,
  getWalletAnalytics,
  getWalletInvestData,
} from "../../services/user/wallet";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../constants";
import { useParams } from "react-router-dom";
import { getAssetInfo } from "../../services/asset/asset";
import AssetPreview from "./AssetPreview";

const BuySell = () => {
  document.title = "Market - Itrust Investments";

  const tk = getAccessToken();
  const { assetId } = useParams();

  const [activeMarketTab, setActiveMarketTab] = useState("asset");
  const [showTradeSection, setShowTradeSection] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleTabChange = (tabName) => {
    setActiveMarketTab(tabName);
    if (tabName === "asset") {
      setShowTradeSection(false);
    }
  };

  const { data: wallets } = useQuery({
    queryFn: getUserWallets,
    queryKey: ["wallets"],
    enabled: !!tk,
  });

  const { data: walletData } = useQuery({
    queryKey: ["walletdata"],
    queryFn: getWalletInvestData,
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
      setSelectedAsset(preSelectedAsset);
      setActiveMarketTab("trade");
      setShowTradeSection(true);
    }
  }, [preSelectedAsset]);

  const shouldShowTradeSection = () => {
    if (activeMarketTab === "trade" && selectedAsset) {
      return true;
    }
    if (activeMarketTab === "trade" && showTradeSection && selectedAsset) {
      return true;
    }
    if (activeMarketTab !== "asset" && preSelectedAsset && !selectedAsset) {
      return true;
    }
    return false;
  };

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
              showPreview={showPreview}
              setShowPreview={setShowPreview}
            />
          </Row>

          {showPreview && (
            <AssetPreview
              asset={selectedAsset}
              handleSubmit={() => {
                setShowPreview(false);
                handleTabChange("trade");
              }}
            />
          )}

          {shouldShowTradeSection() && (
            <TradeSection
              asset={selectedAsset || preSelectedAsset}
              accounts={wallets}
              walletData={walletData}
            />
          )}

          {activeMarketTab === "asset" && !showTradeSection && (
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
