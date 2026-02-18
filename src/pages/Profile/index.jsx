import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../components/Common/BreadCrumb";
import VerifyAccountNotify from "../VerifyAccountNotify";
import UserInfo from "./UserInfo";
import SideTabs from "./SideTabs";
import PersonalInformation from "./PersonalInformation";
import ConfigureInvesting from "./ConfigureInvesting";
import ContactInformation from "./ContactInformation";
import Security from "./Security";
import UserSettings from "./UserSettings";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/user/user";
import { getAccessToken } from "../../constants";

const Profile = () => {
  document.title = "User Profile | Itrust Investments";
  const [activeTab, setActiveTab] = useState("profile");

  const tk = getAccessToken();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    enabled: !!tk,
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="User" pageTitle="Profile" />
          {/* <VerifyAccountNotify /> */}
          <Row>
            <Col md={3}>
              <UserInfo user={user} />
              <SideTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </Col>
            <Col md={9}>
              {activeTab === "profile" && <PersonalInformation user={user} />}
              {activeTab === "contact" && <ContactInformation user={user} />}
              {activeTab === "investing" && <ConfigureInvesting user={user} />}
              {activeTab === "security" && <Security />}
              {activeTab === "settings" && <UserSettings user={user} />}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Profile;
