import React from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";

const SavingsList = () => {
  return (
    <React.Fragment>
      <Col>
        <Card className="">
          <CardHeader>Accounts</CardHeader>
          <CardBody>
            <span className="fw-regular fs-13" style={{ color: "#878A99" }}>
              You have no accounts.
            </span>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default SavingsList;
