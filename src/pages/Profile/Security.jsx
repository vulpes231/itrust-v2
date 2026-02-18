import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

const Security = () => {
  return (
    <Card>
      <CardHeader>
        <div className="d-flex align-items-center justify-content-between">
          <h5>Security</h5>
          <button className="btn btn-primary">Edit</button>
        </div>
      </CardHeader>
      <CardBody>
        <div>See</div>
      </CardBody>
    </Card>
  );
};

export default Security;
