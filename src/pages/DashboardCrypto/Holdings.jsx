import React from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";

const Holdings = () => {
  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <div>
            <h4 className="card-title mb-0 flex-grow-1">Holdings</h4>
          </div>
        </CardHeader>
        <CardBody>
          <Col className="p-4">
            <span style={{ color: "#878A99" }}>You have no holdings</span>
          </Col>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Holdings;
