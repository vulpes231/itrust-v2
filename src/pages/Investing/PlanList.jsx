import React from "react";
import { Card, Col, Input, Row } from "reactstrap";
import Plans from "./Plans";

const PlanList = () => {
  return (
    <React.Fragment>
      <Col className="my-3">
        <Card>
          <Row className="p-3">
            <Col lg={4}>
              {" "}
              <Input type="text" placeholder="Search to ICOs" />
            </Col>
            <Col lg={3}>
              <Input type="date" placeholder="Select Date" />
            </Col>

            <Col lg={2}>
              <Input type="select">
                <option value="active">Active</option>
              </Input>
            </Col>
            <Col lg={2}>
              <Input type="select">
                <option value="">Select Rating</option>
              </Input>
            </Col>
            <Col lg={1}>
              <button className="btn btn-primary w-100">Filter</button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col className="my-3">
        <Plans />
      </Col>
    </React.Fragment>
  );
};

export default PlanList;
