import { capitalize } from "lodash";
import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, Col, Row } from "reactstrap";

const ContactInformation = ({ user }) => {
  // useEffect(() => {
  //   if (user) console.log(user);
  // });
  return (
    <Col>
      <Card>
        <CardHeader>
          <div className="d-flex align-items-center justify-content-between">
            <h5>Contact Information</h5>
            <button className="btn btn-primary">Edit</button>
          </div>
        </CardHeader>
        <CardBody className="d-flex flex-column gap-3 p-4">
          <Row>
            <Col md={6} className="d-flex flex-column gap-1">
              <span className="text-capitalize" style={{ color: "#878A99" }}>
                email address
              </span>
              <h6>{user?.credentials?.email}</h6>
            </Col>
            <Col md={6} className="d-flex flex-column gap-1">
              <span className="text-capitalize" style={{ color: "#878A99" }}>
                phone number
              </span>
              <h6>{user?.contactInfo?.phone}</h6>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>address</span>
              <h6>{user?.contactInfo?.address?.street}</h6>
            </Col>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>country</span>
              <h6>{capitalize(user?.locationDetails?.country?.name)}</h6>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>state/province</span>
              <h6>{capitalize(user?.locationDetails?.state?.name)}</h6>
            </Col>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>city</span>
              <h6>{user?.contactInfo?.address?.city}</h6>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>post code</span>
              <h6>{user?.contactInfo?.address?.zipCode}</h6>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <div className="d-flex align-items-center justify-content-between">
            <h5>Trusted Contacts</h5>
            <button className="btn btn-primary">Edit</button>
          </div>
        </CardHeader>
        <CardBody className="d-flex flex-column gap-3 p-4">
          <div className="p-3 d-flex align-items-center justify-content-center">
            <span style={{ color: "#878A99" }}>
              You have not added any trusted contact.
            </span>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ContactInformation;
