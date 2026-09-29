import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../components/Common/BreadCrumb";
import VerifyAccountNotify from "../VerifyAccountNotify";
import TierList from "./TierList";

const Tiers = () => {
  document.title = "Account Tiers - Itrust Investments";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Account Tier" pageTitle="Pricing" />
          <VerifyAccountNotify />
          <Row className="p-2">
            <TierList />
          </Row>
          {/* <AllTransactions /> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Tiers;
