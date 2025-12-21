import React from "react";
import { Col, Row } from "reactstrap";
import Accounts from "./Accounts";
import Retirements from "./Retirements";
import SavingsList from "./SavingsList";
import SavingsAccounts from "./SavingsAccounts";

const Saving = () => {
  return (
    <React.Fragment>
      <Col>
        <Accounts />
      </Col>
      <Row className="mt-4">
        <Col lg={9}>
          <Retirements />
          <SavingsAccounts />
        </Col>
        <Col lg={3}>
          <SavingsList />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Saving;
