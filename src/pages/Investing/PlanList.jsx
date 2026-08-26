import React, { useState } from "react";
import { Card, Col, Input, Row } from "reactstrap";
import Plans from "./Plans";

const PlanList = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [status, setStatus] = useState("all");
  const [risk, setRisk] = useState("all");

  function handleStatusChange(e) {
    setStatus(e.target.value);
  }
  function handleRiskChange(e) {
    setRisk(e.target.value);
  }
  return (
    <React.Fragment>
      <Col className="my-3">
        <Card>
          <Row>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                onClick={() => setShowFilter(!showFilter)}
                className="btn btn-primary m-3"
                style={{ width: "100px" }}
              >
                Filter
              </button>
            </div>
          </Row>
          {showFilter && (
            <Row className="p-3 d-flex flex-md-row flex-column gap-2">
              <Col lg={4}>
                {" "}
                <Input type="text" placeholder="Search plan" />
              </Col>

              <Col lg={3}>
                <Input
                  type="select"
                  onChange={handleStatusChange}
                  value={status}
                  name="status"
                >
                  <option value="">Status</option>
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="closed">Expired</option>
                </Input>
              </Col>
              <Col lg={3}>
                <Input
                  type="select"
                  onChange={handleRiskChange}
                  value={risk}
                  name="risk"
                >
                  <option value=""> Risk Level</option>
                  <option value="all">All</option>
                  <option value="moderate">Moderate</option>
                  <option value="conservative">Conservative</option>
                  <option value="aggresive">Aggresive</option>
                </Input>
              </Col>
            </Row>
          )}
        </Card>
      </Col>
      <Col className="my-3">
        <Plans status={status} risk={risk} />
      </Col>
    </React.Fragment>
  );
};

export default PlanList;
