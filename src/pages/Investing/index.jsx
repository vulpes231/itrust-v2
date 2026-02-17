import React from "react";

import { Col, Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Widgets from "./Widgets";
import PlanList from "./PlanList";
import VerifyAccountNotify from "../VerifyAccountNotify";

const Investing = () => {
  document.title = "Automated Investing | Itrust Investments";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Automated Investing" pageTitle="Investing" />
          <VerifyAccountNotify />
          <Col>
            <Widgets />
          </Col>
          <Col>
            <PlanList />
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Investing;
