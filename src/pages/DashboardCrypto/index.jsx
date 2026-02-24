import React, { useState } from "react";
import { Container, Row, Alert, Col } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import MyCurrencies from "./MyCurrencies";
import MyPortfolio from "./MyPortfolio";
import NewsFeed from "./NewsFeed";
import RecentActivity from "./RecentActivity";
import TopPerformers from "./TopPerformers";
import Trading from "./Trading";
import Widgets from "./Widgets";
import Widgets1 from "./Widgets1";
import Statistics from "./Statistics";
import VerifyAccountNotify from "../VerifyAccountNotify";

const DashboardCrypto = () => {
  document.title = "Dashboard - Itrust Investments";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Dashboard" pageTitle="Home" />
          <VerifyAccountNotify />

          <Row>
            <Col md={9}>
              <Statistics dataColors='["--vz-info"]' />
              <Widgets1 />
              <MyCurrencies />
            </Col>
            <Col md={3}>
              <MyPortfolio />
            </Col>
          </Row>

          <Row>{/* <Widgets /> */}</Row>

          {/* <Row>
          
           
          </Row>
          <Row>
          
          </Row>
          <Row>
           
            <Trading />
          </Row> */}
          {/* <Row>
            <RecentActivity />
            <TopPerformers />
            <NewsFeed />
          </Row> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardCrypto;
