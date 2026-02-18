import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

const Security = () => {
  return (
    <Card>
      <CardHeader>
        <div className="d-flex align-items-center justify-content-between">
          <h5>Security</h5>
        </div>
      </CardHeader>
      <CardBody className="d-flex flex-column gap-4 p-4">
        <Row>
          <Col className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column gap-1">
              <h6 className="text-capitalize">Reset Password</h6>
              <span style={{ color: "#878A99" }}>
                Last changed 45 days ago.
              </span>
            </div>
            <div className="pr-2">
              <button className="btn btn-primary">Reset Password</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column gap-1">
              <h6 className="text-capitalize">Two factor authentication</h6>
              <span style={{ color: "#878A99" }}>
                Two-factor authentication is an enhanced security measure. Once
                enabled, you'll be required to <br /> enter a code from your
                email whenever you login.
              </span>
            </div>
            <div className="pr-2">
              <button className="btn btn-primary">
                Enable Two-Factor Authentication
              </button>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Security;
