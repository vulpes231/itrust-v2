import React from "react";
import { Col, Container, Row } from "reactstrap";

import Watchlist from "./Watchlist";
import PortfolioStatistics from "./PortfolioStatistics";
import MarketStatus from "./MarketStatus";
import Widgets from "./Widgets";
import RecentTransaction from "./RecentTransaction";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const Portfolio = () => {
  document.title = "Portfolio | Itrust Investments";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Portfolio" pageTitle="History" />
          <Row>
            <Col xxl={9}>
              <PortfolioStatistics dataColors='["--vz-info"]' />
              <Watchlist />
              <MarketStatus />
            </Col>
            <Col xxl={3}>
              <Widgets />
              <RecentTransaction />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Portfolio;
