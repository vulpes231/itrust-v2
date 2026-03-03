import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../components/Common/BreadCrumb";
import VerifyAccountNotify from "../VerifyAccountNotify";

const Histories = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="History" pageTitle="Activities" />
          <VerifyAccountNotify />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Histories;
