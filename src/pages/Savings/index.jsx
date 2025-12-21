import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Saving from "./Saving";

const Savings = () => {
  document.title = "Savings | Itrust Investments";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Savings & Retirement" pageTitle="Savings" />
          <Saving />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Savings;
