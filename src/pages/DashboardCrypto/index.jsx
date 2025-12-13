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
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/user/user";
import { getAccessToken } from "../../constants";
import Statistics from "./Statistics";

const DashboardCrypto = () => {
  document.title = "Dashboard | Itrust Investments";

  const token = getAccessToken();

  const { data: user } = useQuery({
    queryFn: getUserInfo,
    queryKey: ["user"],
    enabled: !!token,
  });
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);
  // console.log(user);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Dashboard" pageTitle="Home" />
          <Row style={{ padding: "0 10px" }}>
            <Alert
              color="danger"
              isOpen={user?.identityVerification?.kycStatus === "not verified"}
              // toggle={onDismiss}
              style={{ display: "flex", gap: "4px" }}
            >
              To start trading, complete your profile verification and access
              multiple accounts and tools to help you manage your money.
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
              color="warning"
              isOpen={user?.identityVerification?.kycStatus === "pending"}
              // toggle={onDismiss}
              style={{ display: "flex", gap: "2px" }}
            >
              Verification request submitted and awaiting review.
            </Alert>
          </Row>

          <Row>
            <Widgets />
          </Row>

          <Row>
            <Statistics dataColors='["--vz-info"]' />
            {/* <MarketGraph /> */}
            <MyPortfolio />
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
