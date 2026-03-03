import React, { useState } from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../components/Common/BreadCrumb";
import MarketGraph from "./MarketGraph";
import Widgets from "./Widgets";
import BuySellCoin from "./BuySellCoin";
import Market from "./Market";
import VerifyAccountNotify from "../VerifyAccountNotify";
import AssetManager from "./AssetManager";
import OrderHistory from "./OrderHistory";

const BuySell = () => {
  document.title = "Buy & Sell | Itrust Investments";

  const [activeMarketTab, setActiveMarketTab] = useState("asset");

  const handleTabChange = (tabName) => {
    setActiveMarketTab(tabName);
  };

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
            />
          </Row>
          <Row className="px-3">
            <Market />
          </Row>
          <Row className="px-3">
            <OrderHistory />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BuySell;
