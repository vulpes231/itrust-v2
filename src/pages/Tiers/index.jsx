import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../components/Common/BreadCrumb";
import VerifyAccountNotify from "../VerifyAccountNotify";
import TierList from "./TierList";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/user/user";
import { getAccessToken } from "../../constants";

const Tiers = () => {
  document.title = "Account Tiers - Itrust Investments";

  const token = getAccessToken();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    enabled: !!token,
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Account Tier" pageTitle="Pricing" />
          <VerifyAccountNotify />
          <Row className="p-2">
            <TierList currency={user?.currency} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Tiers;
