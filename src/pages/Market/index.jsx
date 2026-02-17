import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../components/Common/BreadCrumb";
import MarketGraph from "./MarketGraph";
import Widgets from "./Widgets";
import BuySellCoin from "./BuySellCoin";
import Market from "./Market";
import VerifyAccountNotify from "../VerifyAccountNotify";

const BuySell = () => {
  document.title = "Buy & Sell | Itrust Investments";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Market" pageTitle="Trade" />
          <VerifyAccountNotify />
          <Row>
            <Widgets />
          </Row>
          <Row>
            <MarketGraph dataColors='["--vz-success", "--vz-danger"]' />
            <BuySellCoin />
          </Row>
          <Market />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BuySell;
