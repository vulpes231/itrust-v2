import React, { useState } from "react";
import { Col, Container, Row, Alert } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import MarketGraph from "./MarketGraph";
import MyCurrencies from "./MyCurrencies";
import MyPortfolio from "./MyPortfolio";
import NewsFeed from "./NewsFeed";
import RecentActivity from "./RecentActivity";
import TopPerformers from "./TopPerformers";
import Trading from "./Trading";
import Widgets from "./Widgets";
import Widgets1 from "./Widgets1";
import { getLoggedinUser } from "../../helpers/apiHelper";
import { Link } from "react-router-dom";

const DashboardCrypto = () => {
  document.title = "Dashboard | Itrust Investments";

  const user = getLoggedinUser();
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);
  // console.log(user);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Dashboard" pageTitle="Home" />
          <Row>
            <Alert
              color="danger"
              isOpen={user?.identityVerification?.kycStatus === "not verified"}
              // toggle={onDismiss}
              style={{ display: "flex", gap: "2px" }}
            >
              Your account is not verified!
              <Link
                style={{
                  textDecoration: "underline",
                  color: "inherit",
                  fontWeight: "500",
                }}
                to={"/verifyaccount"}
              >
                Verify your account
              </Link>
            </Alert>
            <Alert
              color="danger"
              isOpen={user?.identityVerification?.kycStatus === "pending"}
              // toggle={onDismiss}
              style={{ display: "flex", gap: "2px" }}
            >
              Verification request submitted and awaiting review.
            </Alert>
          </Row>
          <Row>
            <MyPortfolio />
            <Col className="col-xxl-9 order-xxl-0 order-first">
              <Row>
                <Widgets />
              </Row>
              <MarketGraph />
            </Col>
          </Row>
          <Row>
            <Widgets1 />
          </Row>
          <Row>
            <MyCurrencies />
            <Trading />
          </Row>
          <Row>
            <RecentActivity />
            <TopPerformers />
            <NewsFeed />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardCrypto;
