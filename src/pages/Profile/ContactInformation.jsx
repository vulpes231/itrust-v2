import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

const ContactInformation = ({ user }) => {
  return (
    <Card>
      <CardHeader>
        <div className="d-flex align-items-center justify-content-between">
          <h5>Contact Information</h5>
          <button className="btn btn-primary">Edit</button>
        </div>
      </CardHeader>
      <CardBody>
        <div>See</div>
      </CardBody>
    </Card>
  );
};

export default ContactInformation;
